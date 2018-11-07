const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const PostsSchema = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    date: {type: Date, default: Date.now},
    description: {type: String, required: true},
    userId: {type: ObjectId, ref: 'User', default: null},
    comments: [{type:ObjectId, ref: 'Comments'}]
}, {collection: 'posts'});

const PostModel = mongoose.model('Post', PostsSchema);

module.exports = PostModel;