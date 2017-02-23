var express = require('express');
var router = express.Router();
var Address = require('../models/address');

router.get('/', (req, res) => {
	Address.find((err, results)=> {
		if (err) throw err;
		res.render('index', {results: results});
	});
});

router.get('/add', (req, res) => {
	res.render('add');
});

router.post('/add', (req, res) => {
	Address.create(req.body, function(err,results){
		if(err) throw err;
		res.redirect('/');
	});
});

router.get('/:id', (req, res) => {
	var id = req.params.id;
	Address.findOne({_id: id}, (err, result) => {
		if(err) throw err;
		res.render('edit', {result: result});
	});
});

router.put('/:id', (req, res) => {
	var id = req.params.id;
	Address.findOneAndUpdate({_id: id}, req.body, (err, result) => {
		if(err) throw err;
		res.redirect('/');
	});
});

router.delete('/:id', (req, res) => {
	var id = req.params.id;
	Address.remove({_id: id}, (err,result) => {
		if(err) throw err;
		res.redirect('/');
	});
});

module.exports = router;