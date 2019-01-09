'use strict';
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

module.exports = function () {
    this.sendMail = function (emailSentTo, password, callback) {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'andrianashpontak@gmail.com', // generated ethereal user
                pass: 'Anna05072016' // generated ethereal password
            }
        });
        transporter.use('compile', hbs({
            viewPath: 'templates',
            extName: '.hbs'
        }));

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Blog Admin" <andrianashpontak@gmail.com>', // sender address
            to: emailSentTo, // list of receivers
            subject: 'New Password ', // Subject line
            template: 'newPassword' ,// html body
            context: {
                password: password
            }
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return callback(error);
            }
            callback(null, nodemailer.getTestMessageUrl(info))

        });

    }
    this.sendMailToSubscribers = function (toEmails, bloggerName, callback) {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'andrianashpontak@gmail.com', // generated ethereal user
                pass: 'Anna05072016' // generated ethereal password
            }
        });
        transporter.use('compile', hbs({
            viewPath: 'templates',
            extName: '.hbs'
        }));

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Blog Admin" <andrianashpontak@gmail.com>', // sender address
            to: toEmails, // list of receivers
            subject: bloggerName + ' created New Post ', // Subject line
            template: 'newPost' ,// html body
            context: {
                bloggerName: bloggerName
            }
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return callback(error);
            }
            callback(null, info)

        });

    }




};

