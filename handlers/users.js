const UsersModel = require('../models/user');
const PostModel = require('../models/post');
const LikeDislikeModel = require('../models/likeDislike');
const SubscriberModel = require('../models/subscription');
const sha256 = require('crypto-js/sha256');
const SendEmail = require('../helpers/sendEmail');
const sendEmailHelpers = new SendEmail();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require('bcryptjs');

const sendEmail = new SendEmail();

const UsersHandler = function () {
    this.getAllUsers = function (req, res, next) {
        UsersModel.find({}, function (err, result) {
            if (err) {
                return next(err);
            }
            res.status(200).send({data: result});
        });
    };

    /* this.getAllUsers = function (req, res, next) {

         UsersModel.aggregate([
             {
                 $match: {
                     _id: ObjectId(userId)
                 }
             },
             {
                 $lookup: {
                     from: "users",
                     localField: "_id",
                     foreignField: "userId",
                     as: "users"
                 }
             }
         ], function (err, result) {
             if (err) {
                 return next(err);
             }
             res.status(200).send({data: result})

         })

     };
 */
    this.getUserById = function (req, res, next) {
        UsersModel.aggregate([
            {
                $match: {
                    _id: ObjectId(req.params.id)
                }
            },
            {
                $project: {
                    email: 1,
                    firstName: 1,
                    lastName: 1,
                    role: 1
                }
            }
        ], function (err, users) {
            if (err) {
                return next(err);
            }

            if (!users.length) {
                return res.status(404).send(null);
            }

            SubscriberModel.find({userId: req.params.id}, function (err, subscribers) {
                if (err) {
                    return next(err);
                }

                return res.send({...users[0], subscribers});
            });
        });
    };

    this.getUserByIdWithPosts = function (req, res, next) {
        const page = parseInt(req.query.page) || 0;
        const countPerPage = parseInt(req.query.countPerPage) || 10;
        const userId = req.params.id;

        UsersModel.aggregate([
                {
                    $match: {
                        _id: ObjectId(userId)
                    }
                },
                {
                    $lookup: {
                        from: "posts",
                        localField: "_id",
                        foreignField: "userId",
                        as: "posts"
                    }
                },
                {
                    $unwind: {
                        path: '$posts',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $lookup: {
                        from: "subscribers",
                        localField: "_id",
                        foreignField: "userId",
                        as: "subscribers"
                    }
                },
                {
                    $lookup: {
                        from: "likeDislike",
                        localField: "posts._id",
                        foreignField: "postId",
                        as: "likes"
                    }
                },
                {
                    $project: {
                        "email": 1,
                        "role": 1,
                        "firstName": 1,
                        "lastName": 1,
                        posts: {
                            _id: 1,
                            "userId": 1,
                            "title": 1,
                            "body": 1,
                            "description": 1,
                            "date": 1,
                        },

                        "likes": 1,
                        "subscribers": 1,
                    }
                },
                {
                    $lookup: {
                        from: "comments",
                        localField: "posts._id",
                        foreignField: "postId",
                        as: "posts.comments"
                    }
                },
                {
                    $unwind: {
                        path: "$posts.comments",
                        preserveNullAndEmptyArrays: true
                    }
                },

                {
                    $lookup: {
                        from: "users",
                        localField: "posts.comments.userId",
                        foreignField: "_id",
                        as: "posts.comments.user"
                    }
                },

                {
                    $project: {
                        "email": 1,
                        "role": 1,
                        "firstName": 1,
                        "lastName": 1,
                        posts: {
                            _id: 1,
                            "title": 1,
                            "body": 1,
                            "description": 1,
                            "date": 1,
                            "comments": {
                                _id: "$posts.comments._id",
                                text: "$posts.comments.text",
                                date: "$posts.comments.date",
                                "author": {$arrayElemAt: ["$posts.comments.user", 0]}
                            },
                        },

                        "likes": 1,
                        "subscribers": 1,
                    }
                },

                {
                    $project: {
                        "email": 1,
                        "role": 1,
                        "firstName": 1,
                        "lastName": 1,
                        posts: {
                            _id: 1,
                            "title": 1,
                            "body": 1,
                            "description": 1,
                            "date": 1,
                            "comments": {
                                _id: 1,
                                text: 1,
                                date: 1,
                                "author": {
                                    firstName: 1,
                                    lastName: 1
                                }
                            },
                        },

                        "likes": 1,
                        "subscribers": 1,
                    }
                },

                {
                    $group: {
                        _id: "$posts._id",
                        "userId": {$first: "$_id"},
                        "email": {$first: "$email"},
                        "role": {$first: "$role"},
                        "firstName": {$first: "$firstName"},
                        "lastName": {$first: "$lastName"},
                        comments: {$push: "$posts.comments"},
                        "title": {$first: "$posts.title"},
                        "body": {$first: "$posts.body"},
                        "description": {$first: "$posts.description"},
                        "date": {$first: "$posts.date"},
                        "likes": {$first: "$likes"},
                        "subscribers": {$first: "$subscribers"}

                    }
                }, {
                    $project: {
                        userId: 1,
                        email: 1,
                        role: 1,
                        firstName: 1,
                        lastName: 1,
                        subscribers: 1,
                        posts: {
                            _id: '$_id',
                            title: '$title',
                            body: '$body',
                            description: '$description',
                            date: '$date',
                            comments: '$comments',
                            likes: '$likes',
                        }
                    }
                }, {
                    $group: {
                        _id: '$userId',
                        "email": {$first: "$email"},
                        "role": {$first: "$role"},
                        "firstName": {$first: "$firstName"},
                        "lastName": {$first: "$lastName"},
                        "subscribers": {$first: "$subscribers"},
                        posts: {$push: '$posts'}

                    }
                }
            ],
            function (err, result) {
                if (err) {
                    return next(err);
                }

                return res.status(200).send({
                    data: result.length ? result[0] : {}
                });
            })
    };

    this.getCurrentUser = function (req, res, next) {
        UsersModel.aggregate([
            {
                $match: {
                    _id: ObjectId(req.session.userId)
                }
            },
            {
                $project: {
                    email: 1,
                    firstName: 1,
                    lastName: 1,
                    role: 1
                }
            }
        ], function (err, users) {
            if (err) {
                return next(err);
            }

            if (!users.length) {
                return res.status(404).send(null);
            }

            return res.send(users[0]);
        });
    };

    this.createUser = function (req, res, next) {
        const body = req.body;


        const {
            email,
            pass,
            role,
            firstName,
            lastName
        } = body;
        //  body.pass = sha256(pass);

        bcrypt.hash(body.pass, 10, function (err, hash) {
            if (err) {
                return next(err);
            }

            body.pass = hash;

            UsersModel.findOne({email}, function (error, user) {
                if (error) {
                    return next(error);
                }

                if (user) {
                    return next({ status: 400, message: 'This email is already used' })
                }

                const userModel = new UsersModel(body);

                userModel.save(function (err, result) {
                    if (err) {
                        return next(err);
                    }

                  return res.status(201).send(result);
                });
            });
        });
    };


    this.updateUser = function (req, res, next) {
        const body = req.body;
        const id = req.params.id;

        if (id !== req.session.userId) {
            return res.status(401).json('you cannot update')
        }

        UsersModel.findById(id, function (err, result) {
            if (err) {
                return next(err);
            }

            if (body.newPass) {
                if (result.pass !== sha256(body.pass).toString()) {
                    return res.status(401).json({password: 'pass is incorrect'})
                }

                body.pass = sha256(body.newPass);

                delete body.newPass;
            }


            UsersModel.findByIdAndUpdate(id, body, {new: true}, function (err, result) {
                if (err) {
                    return next(err);
                }

                let {pass, ...rest} = result.toObject();

                return res.status(201).send({updated: rest});
            })
        })
    };

    this.signUp = function (req, res, next) {
        const body = req.body;
        const email = body.email;

        if (!body.role) {
            body.role = '3'
        }

        UsersModel.findOne({email: email}, function (error, user) {
            if (error) {
                return next(error);
            }

            if (user) {
                return next({ status: 400, message: 'This email is already used' })
            }

            if (!user) {
                //  body.pass = sha256(body.pass);

                bcrypt.hash(body.pass, 10, function (err, hash) {
                    if (err) {
                        return next(err);
                    }

                    body.pass = hash;

                    const userModel = new UsersModel(body);

                    return userModel.save(function (err, result) {
                        if (err) {
                            return next(err);
                        }

                        req.session.userRole = result.role;
                        req.session.userId = result._id;
                        req.session.loggedIn = true;

                        res.json(result);
                    });
                });
            }
        });
    };

    this.signIn = function (req, res, next) {
        const body = req.body;
        const email = body.email;
        const pass = body.pass;
        let cryptedPass = sha256(pass);

        cryptedPass = cryptedPass.toString();

        UsersModel.findOne({email: email, pass: cryptedPass}, function (err, users) {
            if (err) {
                return next(err);
            }
            if (!users) {
                req.session.destroy();
                const error = new Error();
                error.message = 'There is no user with this email/password';
                error.status = 400;
                return next(error)
            }

            if (users && users._id) {
                req.session.userRole = users.role;
                req.session.userId = users._id;
                req.session.loggedIn = true;
            }

            res.status(200).send(users)
        })

    };

    this.createModerator = function (req, res, next) {
        const body = req.body;
        body.role = 2;
        const pass = (new Date).getTime();
        const cryptedPass = sha256(pass);

        body.pass = cryptedPass.toString();


        const moderatorModel = new UsersModel(body);

        UsersModel.find({email: body.email}).count(function (error, count) {
            if (error) {
                return next(error);
            }
            if (count) {
                error = new Error();
                error.message = 'this moderator already exists';

                error.status = 400;

                return next(error);
            }

            moderatorModel.save(function (err, result) {
                if (err) {
                    return next(err);
                }

                sendEmail.sendMail(result.email, pass.toString(), function (error, result) {
                    if (error) {
                        return next(err);
                    }

                    res.status(200).send(result);
                })

            })

        })


    };

    this.forgotPassword = function (req, res, next) {
        const email = req.body.email;
        const newPass = (new Date).getTime();
        let cryptedPass = sha256(newPass.toString());
        const cryptedPassStr = cryptedPass.toString();

        UsersModel.findOne({email: email}, (function (error, users) {
            if (error) {
                return next(error)
            }
            if (!users) {
                error = new Error();
                error.message = 'There is no user with this email';
                error.status = 400;
                return next(error);
            }

            const id = users ? users.id : null;
            if (id) {
                UsersModel.findByIdAndUpdate(id, {pass: cryptedPassStr}, {new: true}, function (err, result) {
                    if (err) {
                        return next(err);
                    }

                    sendEmail.sendMail(email, newPass, function (error, res) {
                        console.log('new pass is all ready');
                        if (error) {
                            return next(error);
                        }
                        res.status(201).send({updated: result});
                    })
                    res.status(201).send({updated: result});
                });
            }
        }))
    };


    this.getUserWithSubscribes = function (req, res, next) {
        const userId = req.params.id;
        const subscriberId = req.params.id;
        if (!userId) {
            return res.status(400).send({
                error: {
                    userId: 'You must be logged in for this'
                }
            });
        }


        UsersModel.aggregate([{
            $match: {
                _id: ObjectId(userId)
            }
        },
            {
                $lookup: {
                    from: "subscribers",
                    localField: "_id",
                    foreignField: "userId",
                    as: "subscribers"
                }
            },

            {
                $project: {
                    "subscriberId": 1,
                    "firstName": 1,
                    "lastName": 1

                }
            }

        ], function (err, result) {
            if (err) {
                return next(err);
            }
            res.status(200).send({data: result})

        })
    };

    this.deleteUser = function (req, res, next) {
        const userId = req.params.id;

        UsersModel.findByIdAndDelete(userId, function (err) {
            if (err) {
                return next(err);
            }
            PostModel.deleteMany({userId: userId}, function (err) {
                if (err) {
                    return next(err);
                }
                /*LikeDislikeModel.findByIdAndDelete(id, likes, {new: true}, function (err, result) {
                    if (err) {
                        return next(err);
                    }
                    SubscribtionModel.findByIdAndDelete(id, subscriberId, {new: true}, function (err, result) {
                        if (err) {
                            return next(err);
                        }*/
                let result;
                res.status(201).send({isDeleted: result});
            })
        })
        //     })
        //  });
    };


    this.logout = function (req, res, next) {
        res.status(200).send({logout: 'success'});
    }
};

module.exports = UsersHandler;
