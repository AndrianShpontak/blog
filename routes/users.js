const UsersHandler = require('../handlers/users');
const express = require('express');
const router = express.Router();
const usersHandler = new UsersHandler();
const sessionHelper = require('../helpers/session');
const checkAuthentication = sessionHelper.checkAuthentication;
const destroySession = sessionHelper.destroySession;

/**
 * @api {get} /users/currentUser Get user with subscribers
 * @apiGroup User
 *
 * @apiVersion 1.0.0
 *
 * @apiDescription  Get User With Subscribers
 *
 *
 * @apiSuccess (200) {Object[]} Get info about user's subscribers.
 * @apiSuccessExample {json} Get current user info
 *
 *       HTTP/1.1 200 OK
 {
    "data": [
        {
            "_id": "5c403941ee50d1e390d68794",
            "firstName": "Jane",
            "lastName": "Doe"
        }
    ]
}
 */

router.get('/showUserWithSubscribes/:id', usersHandler.getUserWithSubscribes);

/**
 * @api {get} /users/showUserWithAllPosts/:id Get user's information about him, all his posts and his subscribers.
 * @apiGroup User
 *
 * @apiVersion 1.0.0
 *
 * @apiDescription  Get  user info
 *
 *
 * @apiSuccess (200) {Object[]} Get  info
 * @apiSuccessExample {json} Get current user info
 *
 *       HTTP/1.1 200 OK
 {
    "data": {
        "_id": "5c403941ee50d1e390d68794",
        "email": "andrianaihnatyshch@gmail.com",
        "role": "3",
        "firstName": "Jane",
        "lastName": "Doe",
        "subscribers": [
            {
                "_id": "5c40558d4eea59e562105c0c",
                "userId": "5c403941ee50d1e390d68794",
                "subscriberId": "5c4052054eea59e562105c01",
                "__v": 0
            },
            {
                "_id": "5c4059e2336171e792c3cfe4",
                "userId": "5c403941ee50d1e390d68794",
                "subscriberId": "5c405958336171e792c3cfdd",
                "__v": 0
            }
        ],
        "posts": [
            {
                "_id": "5c404d724eea59e562105bff",
                "title": "Smth interest about smth",
                "body": "Wooow",
                "description": "smth",
                "date": "2019-01-17T09:40:02.623Z",
                "comments": [
                    {
                        "_id": "5c4055744eea59e562105c0a",
                        "text": "It is very interesting!!!",
                        "date": "2019-01-17T10:14:12.225Z",
                        "author": {
                            "firstName": "Jone",
                            "lastName": "Doe"
                        }
                    },
                    {
                        "_id": "5c4059cd336171e792c3cfe2",
                        "text": "Amazing))",
                        "date": "2019-01-17T10:32:45.720Z",
                        "author": {
                            "firstName": "Chris",
                            "lastName": "Cholder"
                        }
                    }
                ],
                "likes": [
                    {
                        "_id": "5c4055324eea59e562105c07",
                        "userId": "5c4052054eea59e562105c01",
                        "postId": "5c404d724eea59e562105bff",
                        "__v": 0
                    },
                    {
                        "_id": "5c4059b4336171e792c3cfdf",
                        "userId": "5c405958336171e792c3cfdd",
                        "postId": "5c404d724eea59e562105bff",
                        "__v": 0
                    }
                ]
            },
            {
                "_id": "5c404e064eea59e562105c00",
                "title": "About weather today",
                "body": "The weather is nice",
                "description": "weather",
                "date": "2019-01-17T09:42:30.185Z",
                "comments": [
                    {
                        "_id": "5c4055434eea59e562105c09",
                        "text": "It's greate",
                        "date": "2019-01-17T10:13:23.635Z",
                        "author": {
                            "firstName": "Jone",
                            "lastName": "Doe"
                        }
                    },
                    {
                        "_id": "5c4059c2336171e792c3cfe1",
                        "text": "Cool!",
                        "date": "2019-01-17T10:32:34.061Z",
                        "author": {
                            "firstName": "Chris",
                            "lastName": "Cholder"
                        }
                    }
                ],
                "likes": [
                    {
                        "_id": "5c4055304eea59e562105c06",
                        "userId": "5c4052054eea59e562105c01",
                        "postId": "5c404e064eea59e562105c00",
                        "__v": 0
                    },
                    {
                        "_id": "5c4059b2336171e792c3cfde",
                        "userId": "5c405958336171e792c3cfdd",
                        "postId": "5c404e064eea59e562105c00",
                        "__v": 0
                    }
                ]
            },
            {
                "_id": "5c4046614eea59e562105bfc",
                "title": "My post",
                "body": "Post about smth",
                "description": "test post",
                "date": "2019-01-17T09:09:53.273Z",
                "comments": [
                    {
                        "_id": "5c4055814eea59e562105c0b",
                        "text": "Wow)",
                        "date": "2019-01-17T10:14:25.801Z",
                        "author": {
                            "firstName": "Jone",
                            "lastName": "Doe"
                        }
                    },
                    {
                        "_id": "5c4059d8336171e792c3cfe3",
                        "text": "Fine)",
                        "date": "2019-01-17T10:32:56.682Z",
                        "author": {
                            "firstName": "Chris",
                            "lastName": "Cholder"
                        }
                    }
                ],
                "likes": [
                    {
                        "_id": "5c4055344eea59e562105c08",
                        "userId": "5c4052054eea59e562105c01",
                        "postId": "5c4046614eea59e562105bfc",
                        "__v": 0
                    },
                    {
                        "_id": "5c4059b6336171e792c3cfe0",
                        "userId": "5c405958336171e792c3cfdd",
                        "postId": "5c4046614eea59e562105bfc",
                        "__v": 0
                    }
                ]
            }
        ]
    }
}
 */

router.get('/showUserWithAllPosts/:id', usersHandler.getUserByIdWithPosts);

/**
 * @api {get} /users/currentUser Get current user info
 * @apiGroup User
 *
 * @apiVersion 1.0.0
 *
 * @apiDescription  Get current user info
 *
 *
 * @apiSuccess (200) {Object[]} Get current user info
 * @apiSuccessExample {json} Get current user info
 *
 *       HTTP/1.1 200 OK
 {
    {
    "_id": "5c3de3751082e1ca56c6da71",
    "email": "andrianaihnatyshch@gmail.com",
    "firstName": "kuk",
    "lastName": "kuk",
    "role": "3"
}
  }
 * @apiError {Object} NotAuthorized User not authorized
 *
 * @apiErrorExample {json} NotFound:
 *
 *    {
 *       "status": 404
 *    }
 */

router.get('/currentUser', usersHandler.getCurrentUser);

/**
 * @api {get} /users/:id Get public user info and information about subscribers.
 * @apiGroup User
 *
 * @apiVersion 1.0.0
 *
 * @apiDescription  Get public user info
 *
 *
 * @apiSuccess (200) {Object} Get public user info
 * @apiSuccessExample {json} Get public user info
 *
 *       HTTP/1.1 200 OK
 {
    "_id": "5c403941ee50d1e390d68794",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "andrianaihnatyshch@gmail.com",
    "role": "3",
    "subscribers": [
        {
            "userId": "5c403941ee50d1e390d68794",
            "subscriberId": "5c4052054eea59e562105c01",
            "_id": "5c40558d4eea59e562105c0c",
            "__v": 0
        },
        {
            "userId": "5c403941ee50d1e390d68794",
            "subscriberId": "5c405958336171e792c3cfdd",
            "_id": "5c4059e2336171e792c3cfe4",
            "__v": 0
        }
    ]
 }
 */

router.get('/:id', usersHandler.getUserById);

/**
 * @api {get} /users/ Retrieve users
 *  * @apiGroup User
 *
 * @apiVersion 1.0.0
 *
 *  * @apiDescription  Get information about all users.
 *
 * @apiSuccess (Success 200) {Number} count Total amount of users.
 *
 * @apiSuccessExample {json} Success-Response:
 {
    "data": [
        {
            "_id": "5bbb467c61422d05aaa0d2cf",
            "email": "andrianashpontak@gmail.com",
            "role": "1",
            "firstName": "Super",
            "lastName": "Admin",
            "pass": "70525d3e78d6fc8c7df5bc8e85874385807ff89f8d26fe03e5593877bb0eca71",
            "__v": 0
        },
        {
            "_id": "5c403941ee50d1e390d68794",
            "firstName": "Jane",
            "lastName": "Doe",
            "email": "andrianaihnatyshch@gmail.com",
            "pass": "$2b$10$5ZjfgCzhKLI2.wcbAn8taOhqSsISZm.Na7CVV./6oqwX5P0PbMVNK",
            "role": "3",
            "__v": 0
        },
        {
            "_id": "5c4052054eea59e562105c01",
            "firstName": "Jone",
            "lastName": "Doe",
            "email": "jone@gmail.com",
            "pass": "$2b$10$thJ3vN2EfzbQB4zRSVlBm.KT0kEg7OxmTstesVIVjuPnEw4sHnglq",
            "role": "3",
            "__v": 0
        },
        {
            "_id": "5c405958336171e792c3cfdd",
            "firstName": "Chris",
            "lastName": "Cholder",
            "email": "cholder@gmail.com",
            "pass": "$2b$10$bhUC.6nK.13e6Py/jHHiUO6PHz1cGvBaFEdtTZRv4OyDrJR1C2nZa",
            "role": "3",
            "__v": 0
        }
    ]
}
 */

router.get('/', /*checkAuthentication,*/ usersHandler.getAllUsers);

/**
 * @api {post} /users/signUp Sign Up
 * @apiGroup User
 *
 * @apiVersion 1.0.0
 *
 * @apiDescription  SignUp user
 *
 * @apiParam {String} email User's email.
 * @apiParam {String} password User's password.
 * @apiParam {String} firstName User's first name.
 * @apiParam {String} lastName User's last name.
 * @apiParam {String} [role] User's role.
 *
 * @apiSuccess (201) {Object[]} Create user
 * @apiSuccessExample {json} Create user
 *
 *     HTTP/1.1 201 OK
 {
    "_id": "5c4052054eea59e562105c01",
    "firstName": "Jone",
    "lastName": "Doe",
    "email": "jone@gmail.com",
    "pass": "$2b$10$thJ3vN2EfzbQB4zRSVlBm.KT0kEg7OxmTstesVIVjuPnEw4sHnglq",
    "role": "3",
    "__v": 0
}
 * @apiError 401  only users.
 *
 *   @apiErrorExample {json} BadRequest:
 *
 *    {
    "status": 401,
    "message": "You can not sign up as admin or moderator"
 *      }
 * @apiError 409 Email already registered.
 *
 *   @apiErrorExample {json} Conflict:
 *
 *    {
 *       "status": 409,
 *        "message": "This email is already used"
 *    }
 *
 */

router.post('/signUp', usersHandler.signUp);

/**
 * @api {post} /users/createModerator Create Moderator
 * @apiGroup User
 *
 * @apiVersion 1.0.0
 *
 * @apiDescription  create Moderator
 *
 * @apiParam {String} email User's email.
 * @apiParam {String} firstName User's first name.
 * @apiParam {String} lastName User's last name.
 *
 * @apiSuccess (201) {Object[]} Create Moderator
 * @apiSuccessExample {json} Create Moderator
 *
 *     HTTP/1.1 201 OK
 {
    "_id": "5c40688053b8b8e9ab4fc241",
    "firstName": "Odri",
    "lastName": "Odri",
    "email": "andrianka1305@gmail.com",
    "role": "2",
    "pass": "$2b$10$iMthWcMUYgHfdpkwNCLybuROkzgMK6wvzAnCuN.iAKRIDITa1esGu",
    "__v": 0
}
 * @apiError 409 Email already registered.
 *
 *   @apiErrorExample {json} Conflict:
 *
 *    {
         "message": "this moderator already exists",
         "status": 409
 *     }
 *
 */

router.post('/createModerator', usersHandler.createModerator);

/***
 * @api {POST} /users/forgotPass Send forgot password code
 *
 *@apiGroup User
 *
 * @apiVersion 1.0.0
 *
 * @apiParam {String} [email] User`s email.
 *
 * @apiParamExample {json} Request-Example:
 *
 *     {
 *	      "email":"andrianaihnatyshch@gmail.com"
 *     }
 *
 * @apiSuccess {Object} success Verification code is sent.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *    {
 *      "success": "New pass is sent"
 *    }
 *
 * @apiError {Object} NotFound User with such email or phone not found
 *
 * @apiErrorExample {json} NotFound:
 *
 *    {
 *       "message": "There is no user with this email",
 *       "status": 400
 *    }
 */

router.post('/forgotPass', usersHandler.forgotPassword);

/***
 * @api {POST} /users/signIn Sign In
 *
 * @apiGroup User
 *
 * @apiVersion 1.0.0
 *
 * @apiParam {String} email User's email.
 * @apiParam {String} pass User`s pass.
 *
 * @apiParamExample {json} Request-Example:
 *
 *     {
            "email": "andrianaihnatyshch@gmail.com",
            "pass": "huighlhiooi877"
        }
 *
 * @apiSuccess {Object} success Login successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "_id": "5c403941ee50d1e390d68794",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "andrianaihnatyshch@gmail.com",
    "pass": "$2b$10$HrH9HeKxUmYsggdVw9.73etCGeefwUM3fi19tofRQzKq9L8THx8KS",
    "role": "3",
    "__v": 0
}
 *
 * @apiError {Object} NotEnoughParameters Not enough sign in parameters login or password
 *
 * @apiError {Object} BadPassword Incorrect email or password
 *
 *    {
        "message": "There is no user with this email/password",
        "status": 400
 *     }
 *
 * @apiError {Object} NotEnoughParameters Not enough sign in parameters pushToken or deviceType
 *
 * @apiError {Object} BadPassword Incorrect email or password
 *
 *   {
        "message": "incorrect password, please try again"
 *   }
 *
 */

router.post('/signIn', usersHandler.signIn);

/**
 * @api {POST} /users/logout Sign Out
 * @apiGroup User
 *
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object} success Logout successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 {
     "success": "Logout successfully"
   }
 *
 */

router.post('/logout', destroySession, usersHandler.logout);

/**
 * @api {post} /users/createUser Create user
 * @apiGroup User
 *
 * @apiVersion 1.0.0
 *
 * @apiDescription  create user
 *
 * @apiParam {String} email User's email.
 * @apiParam {String} password User's password.
 * @apiParam {String} firstName User's first name.
 * @apiParam {String} lastName User's last name.
 * @apiParam {String} [role] User's role.
 *
 * @apiSuccess (201) {Object[]} Create user
 * @apiSuccessExample {json} Create user
 *
 *     HTTP/1.1 201 OK
 {
    "_id": "5c403941ee50d1e390d68794",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "andrianaihnatyshch@gmail.com",
    "pass": "$2b$10$EEU.9nZX3eIIySkvECVDm.as1zqX.EFPvGspHeehINYThcxB2LZZ6",
    "role": "3",
    "__v": 0
}
 * @apiError 401 Create only users.
 *
 *   @apiErrorExample {json} BadRequest:
 *
 *    {
 *       you cannot create admin or moderator
 *    }
 * @apiError 409 Email already registered.
 *
 *   @apiErrorExample {json} Conflict:
 *
 *    {
 *       "status": 409,
 *        "message": "This email is already used"
 *    }
 *
 */

router.post('/createUser', usersHandler.createUser);

/**
 * @api {PATCH} /users/updateUser
 *
 * @apiGroup User
 *
 * @apiVersion 1.0.0
 *
 * @apiParam {String} [firstName] User`s firstName.
 * @apiParam {String} [lastName] User`s lastName.
 * @apiParam {String} [phone] User`s phone.
 * @apiParam {String} [oldPassword] User`s current password. (required in pair with password field)
 * @apiParam {String} [password] User`s password.
 *
 * @apiParamExample {json} Request-Example:
 *
 {
	"pass":"1547725877801",
	"newPass":"Test1111"
 }
 *
 * @apiSuccess {Object} success Account updated successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "updated": {
        "_id": "5c403941ee50d1e390d68794",
        "firstName": "Jane",
        "lastName": "Doe",
        "email": "andrianaihnatyshch@gmail.com",
        "role": "3",
        "__v": 0
    }
}
 *
 * @apiError {Object} NotEnoughParameters Not enough edit parameters
 *
 * @apiError {Object} NotAuthorized User not authorized
 *
 * @apiErrorExample {json} NotAuthorized:
 *
 *    {
 *       "message": "User not authorized",
 *       "status": 401
 *    }
 *
 * @apiError {Object} Passwords Does not Match Please enter matching passwords
 *
 * @apiErrorExample {json} Passwords Does not Match:
 *
 *    {
         "pass": "pass is does not match, please enter correct pass!"
 *    }
 */

router.patch('/:id', checkAuthentication, usersHandler.updateUser);
router.patch('/changePassword/:id', checkAuthentication, usersHandler.changePassword);

router.delete('/:id', usersHandler.deleteUser);


module.exports = router;
