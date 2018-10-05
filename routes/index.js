var usersRouter = require('./users');
 var postsRouter = require('./posts');
 var likeDislikeRouter = require('./likeDislike');


module.exports = function (app) {

    app.use('/users', usersRouter)
    app.use('/post', postsRouter)
    app.use('/like', likeDislikeRouter)

    app.use(function (err, req, res, next) {
        var status = err.status || 500;

        res.status(status).send(err);
    })
};