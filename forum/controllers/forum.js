var express = require('express'),
	router  = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/user.js');
var Post = require('../models/post.js');
var Comment = require('../models/comment.js');

router.get('/new', function(req, res){
    if(req.session.name !== undefined){
		res.render('forum/new.html.ejs',{
			user: req.session.name
		});
    } else {
        res.redirect('/');
    }
})

router.post('/new', function(req, res){
	Post.create(req.body, function(err, post){
		console.log(req.body);
		User.findOne({name : post.author}, function (err, foundUser){
			foundUser.posts = [post];
			foundUser.save();
		});

		res.redirect('/' + req.session.name);
	});
});


module.exports = router;