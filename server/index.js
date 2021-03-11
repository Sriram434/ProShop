const express = require('express')
require('dotenv').config();
const connectDb = require('./models/index') 
const productRoutes = require('./routes/product')
const errorHandlers = require('./handlers/error')
const app = express()
const PORT = process.env.PORT || 8081;

connectDb()

app.get('/', (req, res) =>{
	res.send('api running')
})

//Routing paths
app.use('/api/products',productRoutes)


//Error handlers
app.use( (req,res, next) =>{
	let err = new Error('Not Found')
	err.status = 404
	next(err)
})
app.use(errorHandlers)




app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT} `) )