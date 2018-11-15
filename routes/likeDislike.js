const LikeDislikeHandler = require('../handlers/likeDislike');
const express = require('express');
const router = express.Router();
const likeDislikeHandler = new LikeDislikeHandler();

router.post('/:id', likeDislikeHandler.createDeleteLike);

module.exports = router;