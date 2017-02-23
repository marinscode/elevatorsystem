var mongoose = require('mongoose');

var AddressSchema = mongoose.Schema({
	regnum: String,
	city: String,
	address: String,
	floors: String,
	numberElevators: Number,
	gfloor: { type: Boolean, default: null},
	basement: { type: Boolean},
	date: { type: Date, default: Date.now }
});

AddressSchema.pre('save', (next) => {

	next();
});

var Address = module.exports = mongoose.model('Address', AddressSchema);