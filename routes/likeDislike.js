const LikeDislikeHandler = require('../handlers/likeDislike');
const express = require('express');
const router = express.Router();
const likeDislikeHandler = new LikeDislikeHandler();

/**
 * @api {POST} /likeDislike/ Create like or delete.
 *
 * @apiGroup LikesDislikes
 *
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object} success Post created successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *    {
        "message": "You liked this post!"
*     }
 */

router.post('/:id', likeDislikeHandler.createDeleteLike);

module.exports = router;
