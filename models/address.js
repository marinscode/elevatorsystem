const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
	regnum: String,
	city: String,
	address: String,
	floors: String,
	numberElevators: Number,
	typeElevator: {
		text: String,
		typeId:	{ type: mongoose.Schema.Types.ObjectId,
        	  	  ref: 'Elevator'}
	},
	gfloor: Boolean,
	basement: Boolean,
	isActive: Boolean,
	date: { type: Date, default: Date.now }
});


//index the schema for searching
AddressSchema.index({"$**": "text"});

module.exports = mongoose.model('Address', AddressSchema);