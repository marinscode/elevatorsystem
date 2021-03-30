const express = require('express');
const router = express.Router();

const Address = require('../models/address');
const Elevator = require('../models/elevators');

router.get('/', (req, res) => {
	// aggregate data from 2 collections for dashboard table
	Address.aggregate([{$lookup: { 
		from: 'elevators',
		localField: "typeElevator.typeId",
        foreignField: "_id",
        as: "elevator" }}]).exec((err, results)=> {
			if(err) throw err;
			res.render('addresses', {results});
	});
});



router.get('/add', (req, res) => {
	Elevator.find((err, elevators) => {
		if (err) throw err;
		res.render('addAddress', {elevators: elevators});
	});
});

const checkboxCheck = function (req, res, next){
	if(req.body.gfloor === undefined){
		req.body.gfloor = false;
	}

	if(req.body.basement === undefined){
		req.body.basement = false;
	}

	if(req.body.isActive === undefined){
		req.body.isActive = false;
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
			basement: req.body.basement,
			isActive: req.body.isActive
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
			basement: req.body.basement,
			isActive: req.body.isActive}}, (err, result) => {
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