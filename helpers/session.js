var Session = function () {
    this.checkAuthentication = function (req, res, next) {
        var error;

        if (req.session && req.session.userId && req.session.loggedIn) {
            return next();
        }

        error = new Error();

        error.message = 'Unauthorized';
        error.status = 401;

        next(error)
    }

    this.destroySession = function (req, res, next) {
        if (req.session) {
            req.session.destroy();
        }

        next();
    }
};

module.exports = new Session();