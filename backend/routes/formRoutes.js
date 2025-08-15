const express = require('express'); 
const router = express.Router();
const {formFilled} = require('../controller/formController')
// going to write the controller in a bit

router.get('/formFilled',formFilled);

module.exports= router

