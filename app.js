//NODE API ROUTE....//Hukam Thakur//
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');
const categoryRoutes = require('./api/routes/categories');
const loginUser = require('./admin/controllers/login');
//const loginUser = require('./admin/controllers/app');

app.use(express.static(__dirname + "/admin"));

// connect to Mongoose
mongoose.connect('mongodb://localhost:27017/hukamshop',function(err,db){	
	if(err){
		throw err;
		console.log('db not connected.');
	}else
	{
		console.log("it's working good.");
	}
	//db.close();
});

mongoose.Promise = global.Promise;
app.use(morgan('dev'));
app.use('/upload',express.static('upload'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CORS Error handling Start.
app.use((req, res, next)=>{	
	res.header("Access-Control-Allow-Origin", "*");	
	res.header("Access-Control-Allow-Headers", "Origin, X-Request-Width, Content-Type, Accept, Authorization");		
	if(req.method ==='OPTIONS'){
		res.header("Access-Control-Allow-Method","PUT, POST, PATCH, DELETE, GET");
		return res.status(200).json({});
	}
	next();
});
// CORS Error handling End.


//Routes which should handle the request Start.
app.use('/login', loginUser);
app.use('/orders', ordersRoutes);
app.use('/products', productRoutes);
app.use('/user', userRoutes);
app.use('/category', categoryRoutes);
//Routes which should handle the request End.


app.use((req, res, next)=>{
	const error = new Error('Not Found');
	error.status=404
	next(error);
	
});

app.use((error, req, res, next)=>{
	res.status(error.status || 500);
	res.json({		
		error:{message: error.message}		
	});
	
});
// Return all responce
module.exports = app;