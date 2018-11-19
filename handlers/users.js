const UsersModel = require('../models/user');
const PostModel = require('../models/post');
const LikeDislikeModel = require('../models/likeDislike');
const SubscriberModel = require('../models/subscription')
const sha256 = require('crypto-js/sha256');
const SendEmail = require('../helpers/sendEmail');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const sendEmail = new SendEmail();

const UsersHandler = function () {
        /*this.getAllUsers = function (req, res, next) {
            UsersModel.find({}, function (err, result) {
                if (err) {
                    return next(err);
                }

                res.status(200).send({data: result});
            });
    */

        this.getAllUsers = function (req, res, next) {

            UsersModel.aggregate([{
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
                        lastName: 1
                    }
                }
            ], function (err, users) {
                if (err) {
                    return next(err);
                }

                if (!users.length) {
                    return res.status(404).send(null);
                }

                SubscriberModel.find({ userId: req.params.id }, function (err, subscribers) {
                    if (err) {
                        return next(err);
                    }

                    return res.send({ ...users[0], subscribers });
                });
            });
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
                        lastName: 1
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

            body.pass = sha256(pass);


            if (!role || !firstName || !lastName || !pass || !email) {
                return next({status: 400, message: 'Not found role, or firstName, or lastName, or email, or password'})
            }

            if (!/\S+@\S+\.\S+/.test(email)) {
                return next({status: 400, message: "Email is not valid"})
            }
            ;

            if (pass.length < 4) {
                return next({status: 400, message: "Pass is no valid"})
            }

            UsersModel.findOne({email}, function (error, user) {
                if (error) {
                    return next(error);
                }

                if (user) {
                    return next({status: 400, message: 'This email is already used'})
                }
                const userModel = new UsersModel(body);

                userModel.save(function (err, result) {
                    if (err) {
                        return next(err);
                    }

                    res.status(201).send(result);

                });
            });
        };


        this.updateUser = function (req, res, next) {
            const body = req.body;
            const id = req.params.id;
            const role = body.role;
            const firstName = body.firstName;
            const lastName = body.lastName;
            const email = body.email;
            const pass = body.pass;

            if (!role || !firstName || !lastName || !pass || !email) {
                return next(new Error({message: 'Not found role, or firstName, or lastName, or email, or password'}))
            }

            UsersModel.findByIdAndUpdate(id, body, {new: true}, function (err, result) {
                if (err) {
                    return next(err);
                }

                res.status(201).send({updated: result});
            })
        };

        this.signUp = function (req, res, next) {
            const body = req.body;
            const role = body.role;
            const firstName = body.firstName;
            const lastName = body.lastName;
            const email = body.email;
            const pass = body.pass;
            const err = new Error();

            err.status = 500;

            if (!role || !firstName || !lastName || !pass || !email) {
                return next(new Error({message: 'Not found role, or firstName, or lastName, or email, or password'}))
            }
            if (role !== 3) {
                return next(new Error({message: 'You can not create admin or moderator!'}))
            }

            UsersModel.find({email: email}).count(function (error, count) {
                if (error) {
                    return next(error);
                }

                if (count) {
                    err.message = 'This email is already used';
                    return next(err)
                }


                body.pass = sha256(body.pass);

                const user = new UsersModel(body);

                user.save(function (err, result) {
                    if (err) {
                        return next(err);
                    }

                    res.status(201).send(result)
                })

            })
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

                        res.status(201).send(result);

                    })

                })

            })


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
                PostModel.deleteMany({ userId: userId }, function (err) {
                    if (err) {
                        return next(err);
                    }
                    LikeDislikeModel.findByIdAndDelete(id, likes, {new: true}, function (err, result) {
                        if (err) {
                            return next(err);
                        }
                        SubscriberModel.findByIdAndDelete(id, subscriberId, {new: true}, function (err, result) {


                            if (err) {
                                return next(err);
                            }
                            res.status(201).send({isDeleted: result});
                        })
                    })
                })
            });
        };


        this.logout = function (req, res, next) {
            res.status(200).send({logout: 'success'});
        }
    }
;

module.exports = UsersHandler;