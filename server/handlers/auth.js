const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

//Signin - signIn
const signIn = asyncHandler(async(req,res,next) => {
	const {email, password} = req.body
	
	const user = await User.findOne({email: email})
	
	if(user && (await user.matchPassword(password))){
		let token = jwt.sign({
				id: user._id
			}, process.env.SECRET_KEY);

		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token
		})
	} else{
		res.status(401)
    	throw new Error('Invalid email or password')
	}
})

const signUp = async function(req, res, next){	
	try{
		let user = await User.create(req.body);
		let {id, username, email} = user
		let token = jwt.sign({
			id,
			username,
			email
		},process.env.SECRET_KEY)
		return res.status(200).json({
			id,
			username,
			email,
			token
		})
	}
	catch(err){
		//If Validation fails
		console.log(res.err)
		if(err.code === 11000){
			err.message = 'Email / Username is already taken'	
		}
		return next({
			status: 400,
			message: err.message
		})
	}
}

module.exports = {signIn, signUp}