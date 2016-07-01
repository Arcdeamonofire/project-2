var express = require('express'),
	router  = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/user.js');
var Post = require('../models/post.js');
var Comment = require('../models/comment.js');

//new post page
router.get('/new', function(req, res){
    if(req.session.name !== undefined){
		res.render('forum/new.html.ejs',{
			user: req.session.name
		});
    } else {
        res.redirect('/');
    }
})

//particulare post page
router.get('/:post', function(req,res){
	Post.find({_id:req.params.post}, function(err, foundPost){
		Comment.find({post:req.params.post}, function(err, foundComment){
			res.render('forum/show.html.ejs',{
				post: foundPost,
				comments: foundComment,
				page: req.params.post
			});
		});
	});
});

//new comment page
router.get('/:post/new', function(req,res){
	if(req.session.name !== undefined){
		res.render('forum/comment.html.ejs', {
			page: req.params.post,
			user: req.session.name
		});
	} else {
		res.redirect('/login');
	}
});

// create a post
router.post('/new', function(req, res){
	Post.create(req.body, function(err, post){
		User.findOne({name : post.author}, function (err, foundUser){
			foundUser.posts.push(post);
			foundUser.save(function(err){
				res.redirect('/' + req.session.name);
			});
		});
	});
});

//create a comment
router.post('/:post', function(req,res){
	Comment.create(req.body, function(err, comment){
		Post.findOne({_id:req.params.post}, function(err, foundPost){
			// console.log('this is a post:' + foundPost);
			foundPost.comments.push(comment);
			foundPost.save();
		});
		res.redirect('/forum/'+req.params.post);
	});
});


module.exports = router;