const mysql = require('mysql2/promise')
const config = require('../config')

// createing the pool for queries
const pool = mysql.createPool(config.db);

// verifying connection ! 
pool.getConnection((err, connection)=>{
  if(err){
    console.error('Error connecting to the database : '+err.stack);
    return ;
  }
  console.log('Successfullly connected to the database');
  connection.release();
})

exports.formFilled = async (req,res)=>{
  // fill controller code
  const {memberName, phone, hobby, job, email} = req.body

  // if statement checks for each field server side validation 
  if (!memberName || !phone || !hobby || !job){
    res.status(404).json({message:"Field input are missing!"});
  }
  
  try {
    const [checkPhoneNumber] = await pool.query(
      "SELECT phone_number FROM members WHERE phone_number =?",
      [phone]
    );
    if (checkPhoneNumber.length >0){
      return res.status(409).json({message:"Phone number already registered"});
    }

    await pool.query(
      "INSERT into members (member_name, phone_number, hobby, job, admin_email) VALUES (?,?,?,?,?)",
      [memberName,phone,hobby,job,email]
    );
    res.json({message:"member successfully registererd"});
  }
  catch(err){
    console.error(err);
    res.status(500).json({message :"Database Error from backend"});
  }

}

exports.memberData = async (req,res) =>{
  
}