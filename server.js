const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 1313;
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const createAdmin = require('./helpers/createAdmin');

mongoose.connect('mongodb://localhost:27017/blogDb');
const connection = mongoose.connection;

connection.once('connected', function () {
    console.log('-----connected to DB-------');

    app.use(function (req, res, next) {

        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:2020');

        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Token');

        res.setHeader('Access-Control-Allow-Credentials', true);

        next();
    });

    app.use(bodyParser.json());

    app.use(express.static('src'));

    app.use(expressSession({ // почитайте і запишіть собі на що ці параетри впливають
        name: 'test',
        key: 'testKey',
        secret: '1q2w3e4r5tdhgkdfhgejflkejgkdlgh8j0jge4547hh',
        resave: false, // resave session even it was not changed, mostly not needed
        rolling: true, // cookie will not be set on a response with an uninitialized session.
        saveUninitialized: false,
        store: new MongoStore({
            url: 'mongodb://localhost:27017/testDb',
            autoReconnect: true,
            ssl: false
        }),

        cookie: {
            maxAge: 31 * 24 * 60 * 60 * 1000 // One month
        }
    }));

    createAdmin();

    require('./routes/index')(app);

    app.listen(port, function () {
        console.log('server listening on port ' + port);
    });
});

connection.on('error', function (err) {
    console.log('Error', err);

    process.exit(1);
});







