const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeDislikeSchema = new Schema({
    userId: {type: ObjectId, ref: 'User', default: null},
    postId: {type: ObjectId, ref: 'Post', default: null}
}, {collection: 'posts'});


const LikeDislikeModel = mongoose.model('LikeDislike', LikeDislikeSchema);

module.exports = LikeDislikeModel;