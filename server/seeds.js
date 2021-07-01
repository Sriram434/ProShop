const mongoose = require('mongoose');
require('dotenv').config();
const users = require('./data/users')
const products = require('./data/products')
const User = require('./models/user')
const Product = require('./models/product')
const Order = require('./models/order')
const connectDb = require('./models/index') 

connectDb()

const importData = async () => {
	try{
		//Deleting the entire data existing in the db
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()
		
		const createdUser =  await User.insertMany(users)
		const adminUser = await createdUser[0]._id
		//Adding the admin user from user file to product db 
		const sampleProducts = products.map(product => {
			return{...product, user: adminUser}
		})
		await Product.insertMany(sampleProducts)
		console.log('Data imported')
	} catch(err){
		console.log(err)
	}
}
const destroyData = async () => {
	try{
		//Deleting the entire data existing in the db
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()
		
		
		console.log('Data Destroyed')
	} catch(err){
		console.log(err)
	}
}

if(process.argv[2] === '-d'){
	destroyData()
} else{
	importData()
}
