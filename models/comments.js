const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const CommentsSchema = new Schema({
    text: String,
    date: {type: Date, default: Date.now},
    userId: {type: ObjectId, ref: 'User', default: null},
    postId: {type: ObjectId, ref: 'Post', default: null}
}, {collection: 'comments'});

const CommentsModel = mongoose.model('Comments', CommentsSchema);

module.exports = CommentsModel;