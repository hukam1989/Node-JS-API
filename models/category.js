const mongoose = require('mongoose');
const categorySchema =  mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	categoryname: {type: String, required: true},	
	});
module.exports = mongoose.model('Category', categorySchema);