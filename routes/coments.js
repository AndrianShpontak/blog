const CommentsHandler = require('../handlers/comments');
const express = require('express');
const router = express.Router();
const commentsHandler = new CommentsHandler();

router.get('/', commentsHandler.getAllComments);

router.post('/update/:id', commentsHandler.updateComment);
router.post('/:postId', commentsHandler.createComment);

router.delete('/:id', commentsHandler.deleteComment);

module.exports = router;