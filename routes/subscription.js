const SubscriptionHandler = require('../handlers/subscribtion');
const express = require('express');
const router = express.Router();
const subscriptionHandler = new SubscriptionHandler();

/**
 * @api {POST} /subscription/ Create subscription or delete.
 *
 * @apiGroup subscription
 *
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object} success subscription created successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *    {
        "message": "you have unsubscribed to this user!"
 *     }
 */

router.post('/:id', subscriptionHandler.createDeleteSubscription);

module.exports = router;
