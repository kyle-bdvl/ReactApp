function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

function authentication_JWT(req,res,next){ 
  
}

module.exports = logger;