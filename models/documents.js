const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
	regNum: String,
	contractStartDate: Date,
	monthlyPayment: Number,
	extraPayment: Number,
	dateOfExamination: Date,
	defects: {
		number: Number,
		text: String,
		expire: {
			type: Date,
			default: new Date(+dateOfExamination + 365 * 24 * 60 * 60 * 1000)
		}
	}
});

module.exports = mongoose.model('Document', DocumentSchema);