const UsersModel = require('../models/user');
const sha256 = require('crypto-js/sha256');

function createAdmin() {
    const body = {
        role: '1',
        email: 'andrianashpontak@gmail.com',
        firstName: 'Super',
        lastName: 'Admin',
        pass: '111111'
    };

    body.pass = sha256(body.pass);

    UsersModel.find({role: 1}).count(function (error, count) {
        if (error) {
            return console.log('error to create admin');
        }

        if (count) {
            return console.log('admin is online');
        }

        const adminModel = new UsersModel(body);

        adminModel.save(function (err, result) {
            if (err) {
                return console.log('error to create admin');
            }

            console.log('admin successfully created');
        })
    });
};

module.exports = createAdmin;
