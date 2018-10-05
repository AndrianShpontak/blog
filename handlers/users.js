const UsersModel = require('../models/user');
const sha256 = require('crypto-js/sha256');

const UsersHandler = function () {
    this.getAllUsers = function (req, res, next) {
        UsersModel.find({}, function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(200).send({ data: result });
        })
    };

    this.createUser = function (req, res, next) {
        const body = req.body;
        const userModel = new UsersModel(body);

        userModel.save(function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(201).send(result);
        })
    };

    this.updateUser = function (req, res, next) {
        const body = req.body;
        const id = req.params.id;

        UsersModel.findByIdAndUpdate(id, body, { new: true }, function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(201).send({ updated: result });
        })
    };

    this.signUp = function (req, res, next) {
        const body = req.body;
        const role = body.role;
        const firstName= body.firstName;
        const lastName = body.lastName;
        const email = body.email;
        const pass = body.pass;
        const err = new Error();

        err.status = 500;

        if (!role || !firstName || !lastName || !pass || !email) {
            return next(new Error({message: 'Not found role, or firstName, or lastName, or email, or password'}))
        }
        if (role !== 3){
            return next(new Error({message: 'You can not create admin or moderator!'}))
        }

        UsersModel.find({ email: email }).count(function (error, count) {
            if (error) {
                return next(error);
            }

            if (count) {
                err.message = 'This email is already used';
                return next(err)
            }


            body.pass = sha256(body.pass);

            var user = new UsersModel(body);

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

        UsersModel.findOne({ email: email, pass: cryptedPass }, function (err, users) {
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
        const pass = (new Date).getTime;
        const cryptedPass = sha256(pass);

        body.pass = cryptedPass.toString();

        const moderatorModel = new UsersModel(body);

        moderatorModel.save(function (err, result) {
            if (err) {
                return next(err);
            }

            //ToDo send Email

            res.status(201).send(result);
        })



    };

    this.logout = function (req, res, next) {
        res.status(200).send({logout: 'success'});
    }
};

module.exports = UsersHandler;