var express = require('express');
var router = express.Router();
var Elevator = require('../models/elevators');

router.get('/', (req, res) => {
	Elevator.find((err, results)=> {
		if (err) throw err;
		res.render('elevators', {results: results});
	});
});

router.get('/add', (req, res) => {
	res.render('addElevator');
});

router.post('/add', (req, res) => {
	var newElevator = new Elevator({
		type: req.body.type,
		controlPanel: req.body.controlPanel,
		controller: req.body.controller,
		manufacturer: req.body.manufacturer,
		schemeType: [{
			name: req.body.schemeTypeName,
			description: req.body.schemeTypeDescription
		}],
		doors: req.body.doors,
		maxWeight: req.body.maxWeight,
		personCapacity: req.body.personCapacity,
		velocity: req.body.velocity,
		typeDoors: req.body.typeDoors
	});
	newElevator.save(function(err){
		if(err) throw err;
		res.redirect('/');
	});
});

router.get('/:id', (req, res) => {
	var id = req.params.id;
	Elevator.findOne({_id: id}, (err, result) => {
		if(err) throw err;
		res.render('elevator', {result: result});
	});
});

router.get('/edit/:id', (req, res) => {
	var id = req.params.id;
	Elevator.findOne({_id: id}, (err, result) => {
		if(err) throw err;
		res.render('editElevator', {result: result});
	});
});

router.put('/edit/:id', (req, res) => {
	var id = req.params.id;
	Elevator.findOneAndUpdate({_id: id}, req.body, (err, result) => {
		if(err) throw err;
		res.redirect('/');
	});
});

router.delete('/:id', (req, res) => {
	var id = req.params.id;
	Elevator.remove({_id: id}, (err,result) => {
		if(err) throw err;
		res.redirect('/');
	});
});

module.exports = router;