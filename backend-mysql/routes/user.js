const express = require('express');
const router = express.Router();

// Controllers
const user = require('../controllers/user.js')

// Middleware for handling multimedia data (in this case images)
const multer = require('../middleware/multer.config'); 

// API Endpoints
router.post('/signup', user.signup);
router.post('/login', user.login);
// router.get('', user.getAllUsers);
router.get('/:id', user.getOneUser);
router.delete('/:id', user.deleteUser);
router.put('/:id', multer, user.modifyUser);

module.exports = router;