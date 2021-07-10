const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

//Signin - signIn
const signIn = asyncHandler(async(req,res,next) => {
	const {email, password} = req.body
	
	const user = await User.findOne({email: email})
	
	if(user && (await user.matchPassword(password))){
		let token = jwt.sign({
				id,
				username,
				email
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
		if(err.code === 11000){
			err.message = 'Email / Username is already taken'	
		}
		return next({
			status: 400,
			message: err.message
		})
	}
}

//Get user profile -  /api/users/profile
const getUserProfile = async function(req,res){
	const user = await User.findById(req.user._id)
	
	if(user){
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		})
	}else{
		res.status(404)
		throw new Error('user not found')
	}
}

//Update user profile -  /api/users/profile
const updateUserProfile = async function(req,res){
	const user = await User.findById(req.user._id)
	
	if(user){
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		
		if(req.body.password){
			user.password = req.body.password
		}
		
		const updateUser = await user.save() 
		
		res.json({
			_id: updateUser._id,
			name: updateUser.name,
			email: updateUser.email,
			isAdmin: updateUser.isAdmin,
		})
	}else{
		res.status(404)
		throw new Error('user not found')
	}
}

module.exports = {signIn, signUp, getUserProfile, updateUserProfile}