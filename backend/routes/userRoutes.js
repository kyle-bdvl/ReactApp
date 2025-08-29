const express = require('express');
const router = express.Router();
const {loginUser} = require('../controller/userController')
const {registerUser, refreshAccessToken,logoutUser} = require('../controller/userController')

// if the await fetches this url then it would be directed towards it
router.post('/login',loginUser);
// same with this code 
router.post('/register', registerUser);
router.post('/refresh',refreshAccessToken);
router.post('/logoutUser', logoutUser);

module.exports = router