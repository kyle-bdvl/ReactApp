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
app.use("/api", userRoutes );

// start the backend 
app.listen(5000, () => {
  console.log("server started on port 5000");
})