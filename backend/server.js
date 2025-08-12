const express = require('express')
const cors = require('cors');
const logger = require('./middleware/logger')
const userRoutes = require('./routes/userRoutes')
const fs = require('fs');
const app = express()

const DataFile = './data/data.json'

// middleware 
app.use(cors());
app.use(express.json());

// route for the api 
app.post("/api/register", (req, res) => {
  let existData = []
  const { username, email, password, confirmPassword } = req.body

  // Doing server side validation 
  if (!username, !email, !password, !confirmPassword) {
    return res.send(400).json({ message: "All Fields are required" })
  }

  // checking if the password matches 
  if (password != confirmPassword) {
    return res.send(400).json({ message: "Passwords are not matching" })
  }
  // check if there is any duplicates 
  if (existData.some(user => user.username === username)) {
    return res.status(409).json({ message: "Email already registered" });
  }
  // Read the current data in the file 
  
  if (fs.existsSync(DataFile)) {
    existData = JSON.parse(fs.readFileSync(DataFile, "utf-8"));
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
})

// for the login page 
app.post("/api/login", (req, res) => {
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

})

// start the backend 
app.listen(5000, () => {
  console.log("server started on port 5000");
})