var express = require('express');
var router = express.Router();
var Address = require('../models/address');
var Elevator = require('../models/elevators');

router.get('/', (req, res) => {
	Address.find((err, results)=> {
		if(err) throw err;
		res.render('addresses', {results: results});
	});
});

router.get('/add', (req, res) => {
	Elevator.find((err, elevators) => {
		if (err) throw err;
		res.render('addAddress', {elevators: elevators});
	});
});

var checkboxCheck = function (req, res, next){
	if(req.body.gfloor == undefined){
		req.body.gfloor = false;
	}

	if(req.body.basement == undefined){
		req.body.basement = false;
	}
	next();
}

router.post('/add', checkboxCheck, (req, res) => {
	Elevator.find({type: req.body.typeElevator}, (err, elevator) => {
		if (err) throw err;
		var newAddress = new Address({
			regnum: req.body.regnum,
			city: req.body.city,
			address: req.body.address,
			floors: req.body.floors,
			numberElevators: req.body.numberElevators,
			typeElevator: {
				text: req.body.typeElevator,
				typeId: elevator[0]._id
			},
			gfloor: req.body.gfloor,
			basement: req.body.basement
		});
		newAddress.save(function(err){
		if(err) throw err;
		Address.find({})
            .populate('typeElevator[0].typeId')
            .exec(function(error) {
                if(err) throw err;
            });
		res.redirect('/');
		});
	});
});

router.get('/edit/:id', (req, res) => {
	var id = req.params.id;
	Address.findOne({_id: id}, (err, result) => {
		if(err) throw err;
		Elevator.find((err, elevators) => {
			if(err) throw err;
			res.render('editAddress', {result: result,
									   elevators: elevators});
		});
	});
});

router.put('/edit/:id', checkboxCheck, (req, res) => {
	var id = req.params.id;
	Elevator.find({type: req.body.typeElevator}, (err, elevator) => {
		Address.findOneAndUpdate({_id: id}, {$set: {
			regnum: req.body.regnum,
			city: req.body.city,
			address: req.body.address,
			floors: req.body.floors,
			numberElevators: req.body.numberElevators,
			typeElevator: {
				text: req.body.typeElevator,
				typeId: elevator[0]._id
			},
			gfloor: req.body.gfloor,
			basement: req.body.basement}}, (err, result) => {
			if(err) throw err;
			res.redirect('/');
		});
	});
});

router.delete('/delete/:id', (req, res) => {
	var id = req.params.id;
	Address.remove({_id: id}, (err,result) => {
		if(err) throw err;
		res.redirect('/');
	});
});

module.exports = router;