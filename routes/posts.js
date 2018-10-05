var PostsHandler = require('../handlers/posts');
var express = require('express');
var router = express.Router();
var postsHandler = new PostsHandler();
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

router.get('/', postsHandler.getAllPosts);
router.post('/update/:id', postsHandler.updatePost);
router.delete('/:id', postsHandler.deletePost);
router.post('/', postsHandler.createPost);



module.exports = router;