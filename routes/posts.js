const PostsHandler = require('../handlers/posts');
const express = require('express');
const router = express.Router();
const postsHandler = new PostsHandler();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "tmp");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

/**
 * @api {GET} /post/showPostWithComments/:id Get post by id with comments
 *
 * @apiGroup Posts
 *
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object} success Get post list
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
    "data": {
        "_id": "5c4046614eea59e562105bfc",
        "comments": [],
        "title": "My post",
        "body": "Post about smth",
        "description": "test post",
        "date": "2019-01-17T09:09:53.273Z"
    }
 * }
 *
 * @apiError {Object} NotAuthorized User not authorized
 *
 * @apiErrorExample {json} NotAuthorized:
 *
 *    {
 *       "message": "User not authorized",
 *       "status": 401
 *    }
 */

router.get('/showPostWithComments/:id', postsHandler.getPostByIdWithComments);

/**
 * @api {GET} /post/showPostsWithLike Get all posts with likes
 *
 * @apiGroup Posts
 *
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object} success Get posts list with likes
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 {
    "data": [
        {
            "_id": "5c408491f39071ebe61b668c",
            "title": "Something intresring news",
            "body": "Let's talk about news",
            "description": "news",
            "date": "2019-01-17T13:35:13.015Z",
            "likeDislike": [],
            "postAuthor": {
                "firstName": "Jane",
                "lastName": "Doe"
            }
        },
        {
            "_id": "5c404e064eea59e562105c00",
            "title": "About weather today",
            "body": "The weather is nice",
            "description": "weather",
            "date": "2019-01-17T09:42:30.185Z",
            "likeDislike": [
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
            ],
            "postAuthor": {
                "firstName": "Jane",
                "lastName": "Doe"
            }
        },
        {
            "_id": "5c404d724eea59e562105bff",
            "title": "Smth interest about smth",
            "body": "Wooow",
            "description": "smth",
            "date": "2019-01-17T09:40:02.623Z",
            "likeDislike": [
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
            ],
            "postAuthor": {
                "firstName": "Jane",
                "lastName": "Doe"
            }
        },
        {
            "_id": "5c4046614eea59e562105bfc",
            "title": "My post",
            "body": "Post about smth",
            "description": "test post",
            "date": "2019-01-17T09:09:53.273Z",
            "likeDislike": [
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
            ],
            "postAuthor": {
                "firstName": "Jane",
                "lastName": "Doe"
            }
        }
    ],
    "total": 4
 * }
 *
 * @apiError {Object} NotAuthorized User not authorized
 *
 * @apiErrorExample {json} NotAuthorized:
 *
 *    {
 *       "message": "User not authorized",
 *       "status": 401
 *    }
 */

router.get('/showPostsWithLike', postsHandler.getPostsWithLike);

/**
 * @api {GET} /post/showPostByUserWithComAndLikes/:id Get all user's posts with likes
 *
 * @apiGroup Posts
 *
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object} success Get posts list by one user with likes and comments
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 {
    "data": [
        {
            "_id": "5c404d724eea59e562105bff",
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
            "user": {
                "_id": "5c403941ee50d1e390d68794",
                "firstName": "Jane",
                "lastName": "Doe",
                "email": "andrianaihnatyshch@gmail.com",
                "pass": "$2b$10$HrH9HeKxUmYsggdVw9.73etCGeefwUM3fi19tofRQzKq9L8THx8KS",
                "role": "3",
                "__v": 0
            },
            "title": "Smth interest about smth",
            "body": "Wooow",
            "description": "smth",
            "date": "2019-01-17T09:40:02.623Z",
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
            ],
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
            ]
        },
        {
            "_id": "5c404e064eea59e562105c00",
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
            "user": {
                "_id": "5c403941ee50d1e390d68794",
                "firstName": "Jane",
                "lastName": "Doe",
                "email": "andrianaihnatyshch@gmail.com",
                "pass": "$2b$10$HrH9HeKxUmYsggdVw9.73etCGeefwUM3fi19tofRQzKq9L8THx8KS",
                "role": "3",
                "__v": 0
            },
            "title": "About weather today",
            "body": "The weather is nice",
            "description": "weather",
            "date": "2019-01-17T09:42:30.185Z",
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
            ],
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
            ]
        },
        {
            "_id": "5c4046614eea59e562105bfc",
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
            "user": {
                "_id": "5c403941ee50d1e390d68794",
                "firstName": "Jane",
                "lastName": "Doe",
                "email": "andrianaihnatyshch@gmail.com",
                "pass": "$2b$10$HrH9HeKxUmYsggdVw9.73etCGeefwUM3fi19tofRQzKq9L8THx8KS",
                "role": "3",
                "__v": 0
            },
            "title": "My post",
            "body": "Post about smth",
            "description": "test post",
            "date": "2019-01-17T09:09:53.273Z",
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
            ],
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
            ]
        }
    ]
 * }
 *
 * @apiError {Object} NotAuthorized User not authorized
 *
 * @apiErrorExample {json} NotAuthorized:
 *
 *    {
 *       "message": "User not authorized",
 *       "status": 401
 *    }
 */

router.get('/showPostByUserWithComAndLikes/:id', postsHandler.getPostByUserWithComentsAndLikes);
router.get('/sendMailAboutPost/:id', postsHandler.sendMail);

/**
 * @api {GET} /post/ Get post list
 *
 * @apiGroup Posts
 *
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object} success Get post list
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
    "data": [
        {
            "userId": "5c403941ee50d1e390d68794",
            "comments": [],
            "_id": "5c4046614eea59e562105bfc",
            "title": "My post",
            "body": "Post about smth",
            "description": "test post",
            "date": "2019-01-17T09:09:53.273Z",
            "__v": 0
        },
        {
            "userId": "5c403941ee50d1e390d68794",
            "comments": [],
            "_id": "5c404d724eea59e562105bff",
            "title": "Smth interest about smth",
            "body": "Wooow",
            "description": "smth",
            "date": "2019-01-17T09:40:02.623Z",
            "__v": 0
        },
        {
            "userId": "5c403941ee50d1e390d68794",
            "comments": [],
            "_id": "5c404e064eea59e562105c00",
            "title": "About weather today",
            "body": "The weather is nice",
            "description": "weather",
            "date": "2019-01-17T09:42:30.185Z",
            "__v": 0
        },
        {
            "userId": "5c403941ee50d1e390d68794",
            "comments": [],
            "_id": "5c408491f39071ebe61b668c",
            "title": "Something intresring news",
            "body": "Let's talk about news",
            "description": "news",
            "date": "2019-01-17T13:35:13.015Z",
            "__v": 0
        }
    ]
 * }
 *
 * @apiError {Object} NotAuthorized User not authorized
 *
 * @apiErrorExample {json} NotAuthorized:
 *
 *    {
 *       "message": "User not authorized",
 *       "status": 401
 *    }
 */

router.get('/', postsHandler.getAllPosts);

router.post('/update/:id', postsHandler.updatePost);

/**
 * @api {POST} /post/ Create post and send mail to all subscribers
 *
 * @apiGroup Posts
 *
 * @apiVersion 1.0.0
 *
 * @apiParam {String} title Post title text
 * @apiParam {String} title Post body text
 * @apiParam {String} title Post description text
 *
 * @apiParamExample {json} Request-Example:
 *
 *  {
     	"title": "Something intresring news",
     	"body": "Let's talk about news",
	    "description": "news"
 * }
 *
 * @apiSuccess {Object} success Post created successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
        "userId": "5c403941ee50d1e390d68794",
        "comments": [],
        "_id": "5c408491f39071ebe61b668c",
        "title": "Something intresring news",
        "body": "Let's talk about news",
        "description": "news",
        "date": "2019-01-17T13:35:13.015Z",
        "__v": 0
       }
 */

router.post('/', postsHandler.createPost);

/**
 * @api {DELETE} /post/:id Delete post
 *
 * @apiGroup Posts
 *
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object} success Post created successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
         "delete": true
 *     }
 */

router.delete('/:id', postsHandler.deletePost);

module.exports = router;
