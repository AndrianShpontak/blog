const CommentsHandler = require('../handlers/comments');
const express = require('express');
const router = express.Router();
const commentsHandler = new CommentsHandler();

router.get('/', commentsHandler.getAllComments);

router.post('/update/:id', commentsHandler.updateComment);

/**
 * @api {POST} /comment/ Create comment
 *
 * @apiGroup Comments
 *
 * @apiVersion 1.0.0
 *
 * @apiParam {String} text Comment text
 *
 * @apiParamExample {json} Request-Example:
 *
 * {
	"text":"It is very interesting for me!"
 *  }
 *
 * @apiSuccess {Object} success Post created successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *    {
        "userId": "5c403941ee50d1e390d68794",
        "postId": "5c404d724eea59e562105bff",
         "_id": "5c41e207310b6f0976ff5caf",
        "text": "It is very interesting for me!",
        "date": "2019-01-18T14:26:15.078Z",
        "__v": 0
 *     }
 */

router.post('/:postId', commentsHandler.createComment);

/**
 * @api {DELETE} /comment/:id Delete comment
 *
 * @apiGroup Posts
 *
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object} success Comment deleted successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
             "message": "Comment is deleted"
 *     }
 */

router.delete('/:id', commentsHandler.deleteComment);

module.exports = router;
