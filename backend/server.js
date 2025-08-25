const express = require('express')
const cors = require('cors');
const {logger} = require('./middleware/logger')

const userRoutes = require('./routes/userRoutes')
const formRoutes = require('./routes/formRoutes');
const app = express()


// middleware 
app.use(cors());
app.use(express.json());
app.use(logger)
// app.use(authentication_JWT)  Register logger middleware over here !
// route for the api Users 
app.use("/api", userRoutes );

// route for the api formFillers
app.use("/api", formRoutes);

// start the backend 
app.listen(5000, () => {
  console.log("server started on port 5000");
})