const express = require('express');
const router = express.Router();
const { formFilled } = require('../controller/formController')
const { memberData } = require('../controller/formController');
const { memberFullDetails } = require('../controller/formController');
const {authentication_JWT} = require('../middleware/logger')
// going to write the controller in a bit

router.post('/formFilled', authentication_JWT, formFilled);

// to get the member name ONLY and list it all out  
router.get('/members', authentication_JWT,memberData);

// to get all the members detail from the id 
router.get('/members/:memberId',authentication_JWT, memberFullDetails);
module.exports = router

