const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    role: String,
    email: {type: String, required: true, default: ''},
    pass: String,
    firstName: String,
    lastName: String,


}, {collection: 'users'});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;