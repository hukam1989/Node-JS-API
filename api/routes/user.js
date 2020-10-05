const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');


/*localhost:3000/user/signup 
json:-
{
	"email":"phukamthakur89@gmail.com",
	"password":"hukam0123"
	
}*/
router.post('/signup', (req, res, next) =>{	
	User.find({email: req.body.email})
	.exec()
	.then(user =>{
		if(user.length >=1){
			return res.status(409).json({
				message: 'Mail exists',
			});
		}else{			
				bcrypt.hash(req.body.password, 10, (err, hash)=>{
				if(err){			
					return res.status(500).json({				
						error:err
					})				
				}else{				
					const user = new User({
					_id: mongoose.Types.ObjectId(),
					email: req.body.email,
					password: hash
					});
					user.save()
					.then(result =>{
						console.log(result);
						res.status(201).json({
							message: 'User Created'
						});
					})
					.catch(err => {
						console.log(err);
						res.status(500).json({
						error:err
						});
					});	 		
					
				}				
			});	
		}
		
	})
	.catch();
	
});

/*localhost:3000/user/login
Json:-
{
	"email":"phukamthakur89@gmail.com",
	"password":"hukam0123"
	
}
*/
//login router
router.get('/login', (req, res, next) =>{	

User.find({email:req.body.email})
.exec()
.then(user=>{
	if(user.length < 1)
	{
		console.log(req.body.email);
		return res.status(401).json({
			
			message: 'Auth Faild00000'
		});		
	}
	bcrypt.compare(req.body.password, user[0].password,(err, result)=>{
	if(err){
		return res.status(401).json({
			message: 'Auth failed11111'
		});
	}
	if(result){
		const token = jwt.sign({
			email:user[0].email,
			userId:user[0]._id
		},'secret', { expiresIn: '1h' });
				
		return res.status(200).json({
			message: 'Auth Successfully',
			token:token
		});
	}
	res.status(401).json({
			message: 'Auth failed22222'
		});
	
	
	});	
	
	
})
.catch();

});


//delete router
router.delete('/:userId', (req, res, next) =>{	
User.remove({_id: req.params.id})
.exec()
.then(result =>{
	res.status(200).json({
		message: 'user deleted'
	})
})
.catch(err => {
	console.log(err);
	res.status(500).json({
	error:err
	});
});	 
});

module.exports = router;