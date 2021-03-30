const mongoose = require('mongoose');

const ElevatorSchema = new mongoose.Schema({
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
	velocity: Number,
	typeDoors: String
});

module.exports = mongoose.model('Elevator', ElevatorSchema);