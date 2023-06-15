const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const authenticateMiddleware = require('../middleware/authenticateMiddleware');

// Welcome endpoint
router.get('/welcome', authController.welcome);

// Sign up endpoint
router.post('/signup', authController.signup);

// Login endpoint
router.post('/login', authController.login);

// Edit/add phone number endpoint
router.put('/edit/phonenumber', authenticateMiddleware, authController.editPhoneNumber);

module.exports = router;
