const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

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
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        index: true,
        trim: true,
        required:true
    },
    isActivated:{
        type:Boolean,
        required:true,
        default:false
    },
    verificationToken:{
        type: String
    }
}, {collection: 'users'});

UserSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('pass'))
        return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err)
            return next(err);
        bcrypt.hash(user.pass, salt, function (err, hash) {
            if (err)
                return next(err);

            user.pass = hash;
            next();
        });
    });
});


UserSchema.methods = {
    comparePassword (candidatePass, cb) {
        bcrypt.compare(candidatePass, this.pass, function (err, isMatch) {
            if (err)
                return cb(err);
            cb(undefined, isMatch)
        });
    }
};
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
