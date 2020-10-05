const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../../models/order');
const Product = require('../../models/product');
const checkAuth = require('../../middleware/check-auth');

// handle incoming get Request...
router.get('/', checkAuth, (req, res, next) => {		
	Order.find()
	.select('_id productId quantity')
	.populate('product','name')
	.exec()
	.then(docs=>{
		res.status(200).json({		
		count: docs.length,
		orders:docs.map(doc=>{
			return {
				id:doc._id,
				product:doc.product,
				quantity:doc.quantity,
				request:{
					type:'GET',
					url:'http://localhost:3000/orders/'+doc._id
					
				}
			}
			
		})
			
		});
	})
	.catch(err=>{
		console.log(err);
		res.status(500).json({
			error:err
		});
	});
	
});

router.post('/', checkAuth, (req, res, next) => {
		 Product.findById(req.body.productId).then(product=>{
			if(!product)
			{
				res.status(404).json({
					"message":"Product Id not found"
				});
			}
			const order = new Order({
				_id: mongoose.Types.ObjectId(),
				quantity: req.body.quantity,
				product: req.body.productId		
			});
			return order.save()				 
		 })
		 .then(result =>{
			console.log(result);
			res.status(201).json(result);
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
				error:err
				});
			});	 
	
});


router.get('/:orderId', checkAuth, (req, res, next) => {
	const id = req.params.orderId;
	Order.findById(id)
	.select('_id quantity product')
	.populate('product')
	.exec()
	.then(doc => {
		console.log("Data from Database",doc);
		if(doc){
			res.status(200).json({
				orders:doc,
				request:{
					type: 'Get',
					description:'Get order id',
					url: 'http://localhost:3000/orders/'+doc._id
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

router.delete('/:orderId', checkAuth, (req, res, next) => {	
	res.status(201).json({		
		message: 'delete oreder here'	,
		orderId: req.params.orderId
	});	
});
module.exports = router;