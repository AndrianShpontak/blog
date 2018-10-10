const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


const SubscriptionSchema = new Schema({
    userId: {type: ObjectId, ref: 'User', default: null},
    subscriberId: {type: ObjectId, ref: 'User', default: null}
    }, {collection: 'subscribers'});

const SubscriptionModel = mongoose.model('Subscriber', SubscriptionSchema);

module.exports = SubscriptionModel;