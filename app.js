const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config');
const Address = require('./models/address');
const port = process.env.PORT || 3000;
const addressRouter = require('./routes/addressRoute');
const elevatorRouter = require('./routes/elevatorRoute');
const methodOverride = require('method-override');

const dbUrl = `mongodb+srv://${config.user}:${config.pass}@cluster0.eiv23.mongodb.net/${config.db}`;

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.set('useCreateIndex', true);

app.use(methodOverride('_method'));

// Address.collection.dropIndex('*', function(err, result) {
// 	    if (err) {
// 	        console.log('Error in dropping index!', err);
// 	    }
// 	    console.log(result);
// });

app.get('/', (req, res) => {
	Address.aggregate([{$lookup: { 
		from: 'elevators',
		localField: "typeElevator.typeId",
        foreignField: "_id",
        as: "elevator" }}]).exec((err, results)=> {
			if(err) throw err;
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