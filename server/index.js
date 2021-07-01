require('dotenv').config();
const express = require('express')
const cors = require('cors')
const connectDb = require('./models/index') 
const productRoutes = require('./routes/productRoute')
const authRoutes = require('./routes/authRoute')
const errorHandlers = require('./handlers/error')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 8081;


connectDb()

app.use(cors());
app.use(bodyParser.json())

app.get('/', (req, res) =>{
	res.send('api running')
})

//Routing paths
app.use('/api/products',productRoutes)
app.use('/api/users', authRoutes)


//Error handlers
app.use( (req,res, next) =>{
	let err = new Error('Not Found')
	err.status = 404
	next(err)
})
app.use(errorHandlers)




app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT} `) )