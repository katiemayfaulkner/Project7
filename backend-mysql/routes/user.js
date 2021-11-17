const express = require('express');
const router = express.Router();

// Controllers
const user = require('../controllers/user.js')

// API Endpoints
router.post('/signup', user.signup);
router.get('/login', user.login);
router.get('/:id', user.getUser);
router.delete('/:id', user.deleteUser);
router.put('/:id', user.modifyUser);

module.exports = router;