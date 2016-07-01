var mongoose = require('mongoose');
var postSchema = require('./post').schema;
var commentSchema = require('./comment').schema;

var userSchema = mongoose.Schema({
    name: { type: String, unique: true },
    password: String || Number,
    posts: [postSchema],
    comments: [commentSchema]
})

var User = mongoose.model('User', userSchema);

module.exports = User;