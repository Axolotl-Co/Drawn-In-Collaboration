const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

// Login route
router.post('/login', authController.login);

// Registration route
router.post('/register', authController.register);

// Get authenticated user
router.get('/user', ensureAuthenticated, authController.getUser);

module.exports = router;