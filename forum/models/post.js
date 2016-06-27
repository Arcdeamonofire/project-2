var mongoose = require('mongoose');
var commentSchema = require('./comment').schema;

var postSchema = mongoose.Schema({
	user: String,
	body: String,
	comments: [commentSchema]
})

var Post = mongoose.model('Post', postSchema);

module.exports = Post;