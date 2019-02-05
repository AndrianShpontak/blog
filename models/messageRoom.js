const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const MessageRoomSchema = new Schema({
   // name: {type: String, required: true},
    users: [{type: ObjectId, ref: 'User', required: true}],
}, {collection: 'messageRooms'});

const MessageRoomModel = mongoose.model('MessageRoom', MessageRoomSchema);

module.exports = MessageRoomModel;
