const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../../models/product');
const checkAuth = require('../../middleware/check-auth');
const multer = require('multer');

const storage = multer.diskStorage({	
	destination: function(req, file, cb){
		cb(null,'./upload/');
	},
	filename: function(req, file, cd){
		cd(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
		
	}
});

const upload = multer({storage:storage});

router.get('/',(req, res, next) => {		
	Product.find()
	.select("name price _id productimage")
	.exec()
	.then(docs => {		
		console.log("get all data",docs);		
		const responce = {
			count: docs.length,
			products: docs.map(doc =>{
			return{
					_id: doc._id,
					name: doc.name,
					price: doc.price,
					productimage: doc.productimage,
					request:{
						type:'GET',
						url: 'http://localhost:3000/products/'+doc._id
					}				
				}
			})
		};			
		if(responce){
			res.status(200).json(responce);
		}else{
			res.status(404).json({message: "No valid id found."});
		}
	}).catch(err => {
		console.log(err);
		res.status(500).json({error:err});
	});		
	
});

// Post data into DB
//router.post('/', checkAuth, upload.single('productimage'), (req, res, next) => {
router.post('/',(req, res, next) => {
//console.log(req.file);	
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
		//productimage:req.file.path
		
	});	
	product.save().then(result => {		
		console.log(result);		
		res.status(201).json({		
		message: 'Created products successfully',
		createdProduct: {
				_id: result._id,
				name: result.name,
				price: result.price,
				request:{
				type:'GET',
				url: 'http://localhost:3000/products/'+result._id
				}	
		}
		});	
		
	}).catch(err => {
		console.log(err);
		res.status(500).json({error:err});
	});
	
});


// Get data by Id
router.get('/:productId', (req, res, next) =>{	
	const id = req.params.productId;
	Product.findById(id)
	.select("name price _id productimage")
	.exec().then(doc => {
		console.log("Data from Database",doc);
		if(doc){
			res.status(200).json({
				product:doc,
				request:{
					type: 'Get',
					description:'Get particuler product id',
					url: 'http://localhost:3000/products/'+doc._id
				}
			});
		}else{
			res.status(404).json({message: "No valid id found."});
		}		
		
	}).catch(err => {
		console.log(err);
		res.status(500).json({error:err});
	});
		
});

/* Patch update data on this way --get data from postman like this way
 [{	"propName": "price", "value": "50" }]
 */
//router.patch('/:productId', checkAuth, (req, res, next) =>{	
router.patch('/:productId', (req, res, next) =>{	
	
	const id = req.params.productId;
	const updateOps = {};	
	for( const ops of req.body ){
		updateOps[ops.propName] = ops.value;
	} 
	
	Product.update({_id:id},{$set:updateOps})
	//Product.update({_id:id},{$set: {'name': req.body.name}})
	.exec()
	.then(result => {
		console.log(result);
		res.status(200).json({
			message:"Product details update successfully",
			request:{
					type: 'Get',
					url: 'http://localhost:3000/products/'+id
				}
			
		});
	}).catch(error => {
		console.log(error);
		res.status(500).json({
			error:error
		});
	});
	
});

//***********PUT *********//
router.put('/:productId', (req, res, next) =>{		
	const id = req.params.productId;
	Product.update({_id:id},{$set: {'name': req.body.name, 'price': req.body.price}})
	.exec()
	.then(result => {
		console.log(result);
		res.status(200).json({
			message:"Product details update successfully",
			request:{
					type: 'Get',
					url: 'http://localhost:3000/products/'+id
				}
			
		});
	}).catch(error => {
		console.log(error);
		res.status(500).json({
			error:error
		});
	});
	
});



// Delate product
//router.delete('/:productId', checkAuth, (req, res, next) =>{	
router.delete('/:productId', (req, res, next) =>{	
	const id = req.params.productId;
	Product.remove({_id: id})
	.exec()
	.then(result => {
		console.log(result);					
		res.status(200).json({
			message: "product deleted successfully",
			request:{
				type: 'POST',
				url: 'http://localhost:3000/products/',
				body: {name: 'String', price: 'Number'}
			}
		});
		
	}).catch(err =>{
		console.log(err);
		res.status(500).json({error: err});
	});
	
});

module.exports = router;