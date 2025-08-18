
const mysql = require('mysql2/promise');
const config = require('../config');

// creating a pool for the queries 
const pool = mysql.createPool(config.db);

// verifying connection 
pool.getConnection((err,connection)=>{
  if(err){
    console.error('Error connecting to the database: '+err.stack);
    return;
  }
  console.log('Successfully connected to the database ');
  connection.release();
});


exports.loginUser = async (req, res) => {
  const { email, password } = req.body

  // validate if all the input fields were filled 
  if (!email || !password) {
    return res.status(400).json({ message: "all input fields are required" })
  }

  try { 
    const [rows] = await pool.query(
      'SELECT * FROM admin_users WHERE email = ? AND password =?',
      [email,password]
    );
    if (rows.length ===0){
      return res.status(401).json({message:"Invalid credentials"});
    }

    const user = rows[0];
    return res.json({
      message:"Login Successful",
      user:{username:user.username, email : user.email},
    });
  }
  catch(err){
    console.error(err);
    return res.status(500).json({message:"Database Error"});
  }

  
};



exports.registerUser = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body

  // Doing server side validation 
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All Fields are required" })
  }
  // checking if the password matches 
  if (password != confirmPassword) {
    return res.status(400).json({ message: "Passwords are not matching" })
  }

  try {
    // check if the email exists 
    const [usernameCheck] = await pool.query(
      "SELECT email FROM admin_users WHERE username = ?",
      [username]
    );
    if (usernameCheck.length > 0) {
      return res.status(409).json({ message: "Username already taken" });
    }

    const [emailCheck] = await pool.query(
      "SELECT email FROM admin_users WHERE email =?",
      [email]
    );
    if (emailCheck.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }
    await pool.query(
      "INSERT into admin_users (username,email, password) VALUES (?,?,?)",
      [username, email, password]
    );

    res.json({ message: "User registered successfully", user: { username, email } });

  }catch(err){
    console.error(err);
    res.status(500).json({message: "Database error"});
  }
}