const CommentsModel = require('../models/comments');

const CommentsHandler = function () {
    this.getAllComments = function (req, res, next) {
        CommentsModel.find({}, function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(200).send({data: result});
        })
    };

    this.createComment = function (req, res, next) {
        const body = req.body;
        const userId = req.session.userId;
        const postId = req.params.postId;

        body.userId = userId;
        body.postId = postId;

        commentsModel = new CommentsModel(body);

        commentsModel.save(function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(201).send(result);
        })
    };

    this.updateComment = function (req, res, next) {
        const body = req.body;
        const userId = req.session.userId;
        const postId = req.params.id;

        PostsModel.findById(postId, function (err, result) {
            if (err) {
                return next(err);
            }
            if (result && result.userId.toString() === userId) {
                PostsModel.findByIdAndUpdate(postId, {$set: body}, function (err, result) {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).send(result);
                })

            }
            let error = new Error();
            error.message = 'you can not update';
            error.status = 400;
            next(err);
        });

    };

    this.deleteComment = function (req, res, next) {
        const role = req.session.role;
        const userId = req.session.userId;
        const postId = req.params.id;

        PostsModel.findById(postId, function (err, result) {
            if (err) {
                return next(err);
            }
            if (result && result.userId.toString() === userId || (role < 3)) {
                PostsModel.findByIdAndDelete(postId, function (err, result) {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).send(result);
                })

            }
            let error = new Error();
            error.message = 'you can not delete';
            error.status = 400;
            next(err);
        });
    }


};

module.exports = CommentsHandler;