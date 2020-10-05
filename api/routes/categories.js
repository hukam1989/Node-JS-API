const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//const jwt = require('jsonwebtoken');
const Category = require('../../models/category');
const checkAuth = require('../../middleware/check-auth');


router.post('/', checkAuth,(req, res, next)=>{
	
	const category = new Category({
		_id: new mongoose.Types.ObjectId(),
		categoryname: req.body.categoryname		
	});
	
	category.save()
	.then(result=>{		
		res.status(201).json({
			
			message:'Category created successfully'
			
		});
		
	})
	.catch(err=>{		
		res.status(500).json({
			error:err
		});
		
	});
	
	
});


router.get('/', checkAuth, (req,res,next)=>{
	//{_id:req.body.id}
	Category.find()
	.select('_id categoryname')
	.exec()
	.then(results=>{
		 res.status(200).json({
			//console.log();
			data:results.length,
			category:results.map(rst=>{				
				return {
					Id:rst._id,
					Category:rst.categoryname
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

module.exports = router;