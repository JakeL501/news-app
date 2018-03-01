// NPM Modules

var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();
var mongoose = require('mongoose');
var Promise = require("bluebird");
var axios = require("axios");
var db = require("../models");

// Mongodb models
var Articles = require("../models/articles");
var Comments = require("../models/comments");




router.get("/scrape", function(req, res) {
	// First, we grab the body of the html with request
	axios.get("http://www.echojs.com/").then(function(response) {
	  // Then, we load that into cheerio and save it to $ for a shorthand selector
	  var $ = cheerio.load(response.data);
  
	  // Now, we grab every h2 within an article tag, and do the following:
	  $("article h2").each(function(i, element) {
		// Save an empty result object
		var result = {};
  
		// Add the text and href of every link, and save them as properties of the result object
		result.title = $(this)
		  .children("a")
		  .text();
		result.link = $(this)
		  .children("a")
		  .attr("href");
  
		// Create a new Article using the `result` object built from scraping
		db.Article.create(result)
		  .then(function(dbArticle) {
			// View the added result in the console
			console.log(dbArticle);
		  })
		  .catch(function(err) {
			// If an error occurred, send it to the client
			return res.json(err);
		  });
	  });
  
	  // If we were able to successfully scrape and save an Article, send a message to the client
	  res.send("Scrape Complete");
	});
  });

// Get all current articles in database
router.get('/articles', function(req, res){
	Articles.find().sort({ createdAt: -1 }).exec(function(err, data) { 
		if(err) throw err;
		res.json(data);
	});
});

// Get all comments for one article
router.get('/comments/:id', function(req, res){
	Comments.find({'articleId': req.params.id}).exec(function(err, data) {
		if(err) {
			console.log(err);
		} else {
			res.json(data);
		}	
	});
});

// Add comment for article
router.post('/addcomment/:id', function(req, res){
	console.log(req.params.id+' '+req.body.comment);
	Comments.create({
		articleId: req.params.id,
		name: req.body.name,
		comment: req.body.comment
	}, function(err, docs){    
		if(err){
			console.log(err);			
		} else {
			console.log("New Comment Added");
		}
	});
});

// Delete comment for article
router.get('/deletecomment/:id', function(req, res){
	console.log(req.params.id)
	Comments.remove({'_id': req.params.id}).exec(function(err, data){
		if(err){
			console.log(err);
		} else {
			console.log("Comment deleted");
		}
	})
});

module.exports = router;