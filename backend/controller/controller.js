const fs = require('fs');
const DataFile = './data/data.json'

exports.loginUser = (req,res)=>{
   const {username, password} = req.body 

  // validate if all the input fields were filled 
  if (!username || !password){ 
    return res.status(400).json({message: "all input fields are required"})
  }
  let users = []
  if (fs.existsSync(DataFile)){
    users = JSON.parse(fs.readFileSync(DataFile,"utf-8"));
  }

  const user = users.find(
    user => user.username === username && user.password === password
  )

  if (!user){ 
    return res.status(401).json({message: "Invalid credentials"});
  }

  res.json({message : "Login Successful", user: {username: user.username, email: user.email }})
};

exports.registerUser = (req, res) => {
  let existData = []
  const { username, email, password, confirmPassword } = req.body

  // Doing server side validation 
  if (!username, !email, !password, !confirmPassword) {
    return res.send(400).json({ message: "All Fields are required" })
  }

  // Read the current data in the file 
  
  if (fs.existsSync(DataFile)) {
    existData = JSON.parse(fs.readFileSync(DataFile, "utf-8"));
  }

  // checking if the password matches 
  if (password != confirmPassword) {
    return res.send(400).json({ message: "Passwords are not matching" })
  }
  // check if there is any duplicates 
  if (existData.some(user => user.username === username)) {
    return res.status(409).json({ message: "Email already registered" });
  }
  if (existData.some(user=>user.email === email)){
    return res.status(409).json({message:"Email already registered"});
  }
  

  // add new user to List 
  const newUser = { username, email, password, confirmPassword }
  existData.push(newUser)
  // Save updated data back to file
  try {
    fs.writeFileSync(DataFile, JSON.stringify(existData, null, 2));
  }catch (err){ 
    return res.status(500).json({message: "error saving Data"})
  }
  res.json({ message: "User registered successfully", user: newUser });
}