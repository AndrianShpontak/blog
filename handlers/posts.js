const PostsModel = require('../models/post');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const PostsHandler = function () {
    this.getAllPosts = function (req, res, next) {
        PostsModel.find({}, function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(200).send({data: result});
        })
    };

    this.createPost = function (req, res, next) {
        const body = req.body;
        const userId = req.session.userId;
        const role = req.session.userRole;
        let postModel;

        body.userId = userId;

        postModel = new PostsModel(body);

        if (role === '3') {

            return postModel.save(function (err, result) {
                if (err) {
                    return next(err);
                }

                res.status(201).send(result);
            })
        }

        let error = new Error();
        error.message = 'you can not create post';
        error.status = 400;
        next(error);
    };

    this.updatePost = function (req, res, next) {
        const body = req.body;
        const role = req.session.role;
        const userId = req.session.userId;
        const postId = req.params.id;

        PostsModel.findById(postId, function (err, result) {
            if (err) {
                return next(err);
            }
            if (result && result.userId.toString() === userId || (role < 3)) {
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

    this.deletePost = function (req, res, next) {
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
    };

    this.getPostByIdWithComments = function (req, res, next) {
        const postId = req.params.id;

        PostsModel.aggregate([{
            $match: {
                _id: ObjectId(postId)
            }
        },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "comments"
                }
            },
            {
                $unwind: "$comments"

            },

            {
                $lookup: {
                    from: "users",
                    localField: "comments.userId",
                    foreignField: "_id",
                    as: "comments.user"
                }
            },

            {
                $project: {
                    "userId": 1,
                    "title": 1,
                    "body": 1,
                    "description": 1,
                    "date": 1,
                    "comments": {
                        text: 1,
                        date: 1,
                        "author": {$arrayElemAt: ["$comments.user", 0]}
                    },

                }
            },

            {
                $group: {
                    _id: "$_id",
                    comments:{$push:"$comments"},
                    "title": {$first:"$title"},
                    "body": {$first:"$body"},
                    "description": {$first:"$description"},
                    "date": {$first:"$date"},

                }
            },
        ],
            function (err, result) {
            if (err) {
                return next(err);
            }
            res.status(200).send({data: result})

        })
    };

    this.getPostsWithLike = function (req, res, next) {

        PostsModel.aggregate([{
            $lookup: {
                from: "likeDislike",
                localField: "_id",
                foreignField: "postId",
                as: "likeDislike"
            }
        },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "users",

                }
            },
            {
                $project:{
                    "title": 1,
                    "body": 1,
                    "description": 1,
                    "date": 1,
                    "likeDislikes": {$size: "$likeDislike"},
                    "postAuthor": {$arrayElemAt: ["$users", 0]}
                }
            }

        ],function (err, result) {
                if (err) {
                    return next(err);
                }
                res.status(200).send({data: result})

            })
    }


};

module.exports = PostsHandler;