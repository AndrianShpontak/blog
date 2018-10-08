const LikeDislikeHandler = require('../handlers/likeDislike');
const express = require('express');
const router = express.Router();
const likeDislikeHandlers = new LikeDislikeHandler();

router.post('/:id', likeDislikeHandlers.createDeleteLike);

module.exports = router;