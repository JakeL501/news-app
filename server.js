// Required NPM Packages
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var app = express();
var mongoose = require('mongoose');
var axios = require("axios");
var app = express();


// Public Settings
app.use(express.static(__dirname + '/public'));
var port = process.env.PORT || 3000;

// Database
require("./config/connection");

// Use morgan logging
app.use(logger("dev"));


// BodyParser Settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

var mongoose = require("mongoose");

// Assign Mongoose promise
mongoose.Promise = Promise;

// Local Database Configuration with Mongoose
mongoose.connect("mongodb://localhost/goodnews", function(error)
	{if(error) throw error;
	console.log("Database connected");
});

// mLab database
mongoose.connect("mongodb://heroku_1hbwwwc5:vou3nt74ijraqkecfu8t9q32oi@ds231758.mlab.com:31758/heroku_1hbwwwc5", function(err) {
	if(err) throw err;
	console.log('database connected');
});



// Set up Handlebar for views
var expressHandlebars = require('express-handlebars');
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Routes
var routes = require('./controllers/news.js');
app.use('/',routes);

//404 Error
app.use(function(req, res) {
	res.render('404');
});

//Port
app.listen(port, function() {
    console.log("Listening on port:" + port);
});