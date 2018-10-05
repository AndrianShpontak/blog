const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const PostsSchema = new Schema({
    title: String,
    body: String,
    description: String,
    userId: { type: ObjectId, ref: 'User', default: null }
}, { collection: 'posts' });

const PostModel = mongoose.model('Post', PostsSchema);

module.exports = PostModel;