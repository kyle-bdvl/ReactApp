const fs = require('fs'); 
const DataFile = './data/data.json'

exports.formFilled = (req,res)=>{
  res.status(200).json({message:"api works!"})
}