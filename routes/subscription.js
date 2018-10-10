const SubscriptionHandler = require('../handlers/subscribtion');
const express = require('express');
const router = express.Router();
const subscriptionHandler = new SubscriptionHandler();

router.post('/subscription/:id', subscriptionHandler.createDeleteSubscription);

module.exports = router;