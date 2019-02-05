const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const MessageSchema = new Schema({
    body: {type: String, required: true},
    senderId: {type: ObjectId, ref: 'User', required: true},
    receiverId: {type: ObjectId, ref: 'User', required: true},
    roomId:{type: ObjectId, ref: 'MessageRoom', required:true},
    createdAt: {type: Date, default: Date.now},
    readAt: {type: Date}
}, {collection: 'messages'});

//Schema.set('toJSON', {versionKey: false});

const MessageModel = mongoose.model('Message', MessageSchema);

module.exports = MessageModel;
