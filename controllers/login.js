var express = require('express'),
	router  = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/user.js');
var Post = require('../models/post.js');
var Comment = require('../models/comment.js');

router.get('/new', function(req, res){
	res.render('users/new.html.ejs');
});

router.get('/', function(req, res){
	res.render('users/login.html.ejs');
})

router.post('/new', function(req, res){
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	req.session.name = req.body.name;
	User.create(req.body, function(err, user){
		console.log(user)
		res.redirect('/'+user.name);
	});
});

router.post('/', function(req, res){
	User.findOne({name:req.body.name}, function(err, foundUser){
		if(bcrypt.compareSync(req.body.password, foundUser.password)){
			req.session.name = foundUser.name;
			// res.send(foundUser);
			res.redirect('/'+foundUser.name);
		} else {
			res.send(foundUser);
			// res.redirect('/');
		}
	});
});

router.delete('/destroy', function(req,res){
	req.session.destroy(function(err){
        res.redirect('/');
    });
});

module.exports = router;