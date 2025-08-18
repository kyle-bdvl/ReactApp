const express = require('express'); 
const router = express.Router();
const {formFilled} = require('../controller/formController')
const {memberData} = require('../controller/formController');
// going to write the controller in a bit

router.post('/formFilled',formFilled);

// to get the member details and display it 
router.get('/members',memberData)
module.exports= router

