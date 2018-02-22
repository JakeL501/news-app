var mongoose = require("mongoose");

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