var mongoose = require('mongoose');

var AddressSchema = new mongoose.Schema({
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
	gfloor: { type: Boolean},
	basement: { type: Boolean},
	date: { type: Date, default: Date.now }
});

var Address = module.exports = mongoose.model('Address', AddressSchema);