const usersRouter = require('./users');
const postsRouter = require('./posts');
const likeDislikeRouter = require('./likeDislike');
const subscriptionRouter = require('./subscription');
const commentsRouter = require('./coments');
const messageRoomRouter = require('./messageRoom');

module.exports = function (app) {
    app.use('/users', usersRouter);
    app.use('/post', postsRouter);
    app.use('/likeDislike', likeDislikeRouter);
    app.use('/comment', commentsRouter);
    app.use('/subscription', subscriptionRouter);
    app.use('/message', messageRoomRouter);

    app.use(function (err, req, res, next) {
        const status = err.status || 500;

        res.status(status).send(err);
    })
};
