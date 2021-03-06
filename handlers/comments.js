const CommentsModel = require('../models/comments');

const CommentsHandler = function () {
    /*this.getAllComments = function (req, res, next) {
        CommentsModel.find({}, function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(200).send({data: result});
        })*/

    this.getAllComments = function (req, res, next) {
        const page = req.query.page;
        const countPerPage = req.query.CountPerPage;
        const userId = req.session.userId;

        if (!userId) {
            return res.status(400).send({
                error: {
                    userId: 'You must be logged in for this'
                }
            });
        }

        CommentsModel
            .aggregate([
                {
                    "$skip": page * countPerPage
                },
                {
                    "$limit": countPerPage
                },

            ], function (err, result) {
                if (err) {
                    return next(err);
                }
                res.status(200).send({data: result})

            })
    };

    this.createComment = function (req, res, next) {
        const body = req.body;
        const userId = req.session.userId;
        const postId = req.params.postId;

        body.userId = userId;
        body.postId = postId;

        if(!body.text){
            const error = new Error();
            error.message = 'Your create is not valid';
            return next(error)
        }

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
        //const postId = req.params.id;
        const commentId = req.params.id;

       CommentsModel.findById(commentId, function (err, result) {
            if (err) {
                return next(err);
            }
            if (result && result.userId.toString() === userId || (role < 3)) {
                CommentsModel.findByIdAndDelete(commentId, function (err, result) {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).send({"message": "Comment is deleted"});
                })

            } else {
                let error = new Error();
                error.message = 'you can not delete';
                error.status = 400;
                next(err);
            }

        });

    }


};

module.exports = CommentsHandler;
