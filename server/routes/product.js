const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const asyncHandler = require('express-async-handler')

//Fetch all products
///api/products
router.get('/', asyncHandler(async(req,res) => {
	const products = await Product.find({})
	res.json(products)
}))

///api/products
router.get('/:id', asyncHandler(async(req,res) => {
	const product = await Product.findById(req.params.id)
	if(product){
		res.json(product)
	}else{
		res.status(404).json({message:'message not found'})
	}
	
}))

module.exports = router;