var express = require('express');
var app = express();
var ejs = require('ejs');
var path = require('path');
var mongoose = require('mongoose');
var config = require('./config');
var bodyParser = require('body-parser');
var Address = require('./models/address');
var port = process.env.PORT || 3000;
var addressRouter = require('./routes/addressRoute');
var elevatorRouter = require('./routes/elevatorRoute');
var methodOverride = require('method-override');

var dbUrl = 'mongodb://'+ config.user +':'+ config.pass + '@ds155509.mlab.com:55509/elevsystem';

mongoose.connect(dbUrl);
var db = mongoose.connection;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

Address.collection.dropIndex('*', function(err, result) {
	    if (err) {
	        console.log('Error in dropping index!', err);
	    }
	    console.log(result);
});

app.get('/', (req, res) => {
	Address.aggregate({$lookup: { 
		from: 'elevators',
		localField: "typeElevator.typeId",
        foreignField: "_id",
        as: "elevator" }}).exec((err, results)=> {
			if(err) throw err;
			console.log(results[0].elevator[0].maxWeight);
			res.render('addresses', {results});
	});
});

app.get("/search", function(req, res) {
  	Address.aggregate([ {$match: {$text: { $search: req.query.search } }},{$lookup: { 
		from: 'elevators',
		localField: "typeElevator.typeId",
        foreignField: "_id",
        as: "elevator" }}]).exec((err, results) => {
        res.render('addresses', {results});
  	});
});

app.use('/address', addressRouter);
app.use('/elevator', elevatorRouter);

app.listen(port, () => {
	console.log("Server is running on port " + port);
});