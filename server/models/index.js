const mongoose = require('mongoose');
require('dotenv').config()
mongoose.set('debug', true)
mongoose.Promise = Promise;

const connectDb = async () => {
	try{
		const conn = await mongoose.connect(process.env.MONGO_URI,{
			useNewUrlParser: true, useUnifiedTopology: true
		})
		console.log('connected to DB')
	} catch(err){
		console.log(err)
	}
}


module.exports = connectDb