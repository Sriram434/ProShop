require("dotenv").config()
const jwt = require('jsonwebtoken')

//user is logged in - authenication
exports.loginRequired = function(req, res, next){
	try{
		const token = req.headers.authorization.split(" ")[1]
		jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
			if(decoded){
				return next()
			} else{
				return next({
					status: 401,
					message: 'Please log in '
				})
			}
		})
	} catch(err){
		return next({
			status: 401,
			message:err.message
		})
	}
	
}

//user admin 
exports.admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}