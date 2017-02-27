var mongoose = require('mongoose');

var ElevatorSchema = new mongoose.Schema({
	type: String,
	controlPanel: String,
	controller: String,
	manufacturer: String,
	schemeType: [{
		name: String,
		description: String
	}],
	doors: Number,
	maxWeight: Number,
	personCapacity: Number,
	velocity: Number
});

var Elevator = module.exports = mongoose.model('Elevator', ElevatorSchema);