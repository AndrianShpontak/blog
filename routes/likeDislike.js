var LikeDislikeHandler = require('../handlers/likeDislike');
var express = require('express');
var router = express.Router();
var likeDislikeHandlers = new LikeDislikeHandler();


router.post('/:id', likeDislikeHandlers.createdeleteLike);


module.exports = router;