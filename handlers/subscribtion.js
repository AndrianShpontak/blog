const SubscriptionModel = require('../models/subscription');
const mongoose = require('mongoose');

const SubscriptionHandler = function () {
    this.createDeleteSubscription = function (req, res, next) {
        const userId = req.params.id;
        const subscriberId = req.session.userId;
        const role = req.session.userRole;


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
                        res.status(200).send({'message':'you have unsubscribed to this user!'});

                    })
                }
                subscriptionModel = new SubscriptionModel({userId: userId, subscriberId: subscriberId});

                subscriptionModel.save(function (err, result) {
                    if (err) {
                        return next(err);
                    }

                    res.status(201).send({'message':'you have subscribed to this user!'});
                })
            })

    };

};

module.exports = SubscriptionHandler;
