const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true, 
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false
	},
}, {
	timestamps: true 
})

//Password hashing
userSchema.pre('save', async function(next){
	try{
		//Hash the password if it is modified or new 
		// Else return next
		if(!this.isModified('password')){
			return next()
		}
		let hashedPassword = await bcrypt.hash(this.password,10)
		this.password = hashedPassword
		return next()
	}catch(err){
		return next(err)
	}
})

//Comapring the hasehd password
userSchema.methods.matchPassword = async function(candPassword){
	return await bcrypt.compare(candPassword, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User;