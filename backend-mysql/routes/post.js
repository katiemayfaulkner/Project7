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
router.post('/comment', post.postComment);
router.get('/comments', post.getComments);

router.post('/view/:id', post.viewPost);
router.post('/unview/:id', post.unviewPost);

module.exports = router;