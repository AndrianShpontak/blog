const SubscriptionModel = require('../models/subscription');
const mongoose = require('mongoose');

const SubscriptionHandler = function () {
    this.createDeleteSubscription = function (req, res, next) {
        const userId = req.params.id;
        const subscriberId = req.session.userId;
        const role = req.session.userRole;


        if (role === '3') {
            return SubscriptionModel.find({userId: userId, subscriberId: subscriberId}).count(function (error, count) {
                if (error) {
                    return next(error);
                }
                if (count) {
                    return SubscriptionModel.findOneAndRemove({
                        userId: userId,
                        subscriberId: subscriberId
                    }, function (err, result) {

                        if (err) {
                            return next(err);
                        }
                        res.status(200).send(result);

                    })
                }
                subscriptionModel = new SubscriptionModel({userId: userId, subscriberId: subscriberId});

                subscriptionModel.save(function (err, result) {
                    if (err) {
                        return next(err);
                    }

                    res.status(201).send(result);
                })
            })
        }
          let error = new Error();
          error.message = 'you can not subscribe';
          error.status = 400;
          next(error);
        };

};

module.exports = SubscriptionHandler;