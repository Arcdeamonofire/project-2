var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var bcrypt = require('bcrypt');
var methodOverride = require('method-override');
var User = require('./models/user.js');
var Post = require('./models/post.js');
var Comment = require('./models/comment.js');
var ejsLayouts = require("express-ejs-layouts");

var port = process.env.PORT || 3000;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/forumproject';

var forumController = require('./controllers/forum'),
    loginController     = require('./controllers/login');

app.set("view engine","ejs");
app.set("views","./views");

app.use(session({
    secret: "birdistheword",
    resave: false,
    saveUninitialized: false
}));

app.use(express.static('public'));
app.use(ejsLayouts);

app.use(bodyParser.urlencoded({extended:false}));

app.use(methodOverride('_method'));

app.use('/forum', forumController);
app.use('/login', loginController);

app.get('/', function(req,res){
	Post.find({}, function(err, foundPosts){
		// console.log(foundPosts);
		res.render('home.html.ejs', {
			posts: foundPosts,
			user: undefined
		});
	})
	
})

app.get('/:username', function(req,res){
	// if(req.params.username !== req.session.name){
	// 	res.redirect('/');
	// }
    if(req.session.name !== undefined){
    	Post.find({}, function(err, foundPosts){
			res.render('home.html.ejs',{
				user: req.session.name,
				posts: foundPosts
			});
		});
    } else {
        res.redirect('/');
    }

});

mongoose.connect(mongoDBURI);

mongoose.connection.once('open', function(){
    console.log('waiting for instructions');
})

app.listen(port, function(){
    console.log('listening');
})