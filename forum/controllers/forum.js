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

router.get('/:post', function(req,res){
	Post.find({_id:req.params.post}, function(err, foundPost){
		res.render('forum/show.html.ejs',{
			post: foundPost,
			page: req.params.post
		});
	});
});

router.get('/:post/new', function(req,res){
	res.render('forum/comment.html.ejs', {
		page: req.params.post,
		user: req.session.name
	});
});

router.post('/new', function(req, res){
	Post.create(req.body, function(err, post){
		User.findOne({name : post.author}, function (err, foundUser){
			foundUser.posts = [post];
			foundUser.save();
		});

		res.redirect('/' + req.session.name);
	});
});

router.post('/:post', function(req,res){
	Comment.create(req.body, function(err, comment){
		Post.findOne({_id:comment.post}, function(err, foundPost){
			foundPost.comments = [comment];
			foundPOst.save();
		});
		User.findOne({name: comment.user}, function(err, foundUser){
			foundUser.comments = [comment];
			foundUser.save();
		})
		res.redirect('/'+req.params.post);
	});
});


module.exports = router;