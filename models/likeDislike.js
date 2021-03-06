const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const LikeDislikeSchema = new Schema({
    userId: {type: ObjectId, ref: 'User', default: null},
    postId: {type: ObjectId, ref: 'Post', default: null}
}, {collection: 'likeDislike'});


const LikeDislikeModel = mongoose.model('LikeDislike', LikeDislikeSchema);

module.exports = LikeDislikeModel;