const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    role: {type: String},
    email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    pass: {
        type: String,
        match: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
        required: true
    },
    firstName: {
        type: String,
        index: true,
        trim: true
    },
    lastName: {
        type: String,
        index: true,
        trim: true
    },
    forgotPasswordToken: String
}, {collection: 'users'});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
