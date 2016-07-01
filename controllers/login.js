var express = require('express'),
	router  = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/user.js');
var Post = require('../models/post.js');
var Comment = require('../models/comment.js');

//sign up page
router.get('/new', function(req, res){
	res.render('users/new.html.ejs');
});

//login page
router.get('/', function(req, res){
	res.render('users/login.html.ejs');
})

//adding a new login
router.post('/new', function(req, res){
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	req.session.name = req.body.name;
	User.create(req.body, function(err, user){
		res.redirect('/'+user.name);
	});
});

//loging in
router.post('/', function(req, res){
	User.findOne({name:req.body.name}, function(err, foundUser){
		if(bcrypt.compareSync(req.body.password, foundUser.password)){
			req.session.name = foundUser.name;
			res.redirect('/'+foundUser.name);
		} else {
			res.send(foundUser);
		}
	});
});

//logging out
router.delete('/destroy', function(req,res){
	req.session.destroy(function(err){
        res.redirect('/');
    });
});

module.exports = router;