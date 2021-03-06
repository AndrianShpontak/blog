const LikeDislikeModel = require('../models/likeDislike');

const LikeDislikeHandler = function () {
    this.createDeleteLike = function (req, res, next) {
        const userId = req.session.userId;

        if (!userId) {
            return res.status(400).send({
                error: {
                    userId: 'You must be logged in for this'
                }
            });
        }

        const postId = req.params.id;

        LikeDislikeModel.find({userId: userId, postId: postId}).count(function (error, count) {
            if (error) {
                return next(error);
            }
            if (count) {
                return LikeDislikeModel.findOneAndRemove({userId: userId, postId: postId}, function (err, result) {

                    if (err) {
                        return next(err);
                    }

                    res.status(200).send({'message':'You disliked this post!'});

                })
            }
            likeDislikeModel = new LikeDislikeModel({userId: userId, postId: postId});

            likeDislikeModel.save(function (err, result) {
                if (err) {
                    return next(err);
                }

                res.status(201).send({'message':'You liked this post!'});
            })
        })

    }
};
module.exports = LikeDislikeHandler;

