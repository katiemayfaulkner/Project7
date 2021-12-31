const express = require('express');
const router = express.Router();

// Controllers
const post = require('../controllers/post.js')

// Middleware for handling multimedia data (in this case images)
const multer = require('../middleware/multer.config'); 

// API Endpoints
router.post('', multer, post.createPost);
router.get('', post.getAllPosts);
router.delete('/:id', post.deletePost);

router.post('/comment/:id', post.postComment);
router.get('/comments/:id', post.getComments);

router.post('/view/:id', post.viewPost);
router.delete('/view/:id', post.unviewPost);
router.get('/view/:id', post.getView)

module.exports = router;