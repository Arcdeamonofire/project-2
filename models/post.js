var mongoose = require('mongoose');
var commentSchema = require('./comment').schema;
// var userSchema = require('./user').schema;

var postSchema = mongoose.Schema({
	author: String,
	title: String,
	body: String,
	comments: [commentSchema]
})

var Post = mongoose.model('Post', postSchema);

module.exports = Post;