const LikeDislikeModel = require('../models/likeDislike');

const LikeDislikeHandlers = function () {
    this.createDeleteLike = function (req, res, next) {
        const userId = req.session.userId;
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
                    res.status(200).send(result);

                })
            }
            likeDislikeModel = new LikeDislikeModel({userId: userId, postId: postId});

            likeDislikeModel.save(function (err, result) {
                if (err) {
                    return next(err);
                }

                res.status(201).send(result);
            })
        })

    }
};
module.exports = LikeDislikeHandlers;

