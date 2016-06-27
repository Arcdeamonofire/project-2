var mongoose = require('mongoose');


var commentSchema = mongoose.Schema({
    user: String,
    body: String,
    post: String

})

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;