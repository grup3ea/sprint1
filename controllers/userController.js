//File: controllers/tvshows.js
var mongoose = require('mongoose');
var userModel  = mongoose.model('userModel');

/* */
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var express         = require("express");
var app             = express();
var config = require('../config'); // get our config file
app.set('superSecret', config.secret); // secret variable
/* */

//GET - Return all tvshows in the DB
exports.findAllUsers = function(req, res) {
	userModel.find(function(err, users) {
    if(err) res.send(500, err.message);

    console.log('GET /users');
		res.status(200).jsonp(users);
	});
};

//GET - returns users
exports.findById = function(req, res) {
	userModel.findById(req.params.id, function(err, user) {
    if(err) return res.send(500, err.message);

    console.log('GET /users/' + req.params.id);
		res.status(200).jsonp(user);
	});
};

exports.findUserByUsername = function(req, res) {
    userModel.find({
      name: req.params.username
  }, function(err, user) {

      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'no user found' });
    } else if (user) {
        console.log(user);
          // return the information including token as JSON
          res.jsonp(user);


      }

    });
};

//POST - Insert a new TVShow in the DB
exports.addUser = function(req, res) {
	console.log('POST new user, name: ' + req.body.name);
	console.log(req.body);

	var user = new userModel({
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
    description:   req.body.description
	});

	user.save(function(err, user) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(user);
	});
};
exports.addPublication = function(req, res) {
	console.log('POST new publication, title: ' + req.body.title);

	console.log(req.params.id);

	userModel.findById(req.params.id, function(err, user){
		console.log(user.name);
		var publication = {
			title: req.body.title,
			date: new Date(),
			content: req.body.content
		};
		user.publications.push(publication);

		user.save(function(err, user) {
			if(err) return res.send(500, err.message);
	    res.status(200).jsonp(user);
		});
	});

};




//POST - auth user
exports.login = function(req, res) {
	console.log("login user: " + req.body.userName);
	// find the user
  userModel.findOne({
    name: req.body.userName
}, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          //expiresInMinutes: 1440 // expires in 24 hours
		  expiresIn: '60m'
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
					userId: user._id,
		  		userName: user.name
        });
      }

    }

  });
};
