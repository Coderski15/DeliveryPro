// PACKAGES
const express = require('express');

// FILES
const { registerUser, logout, loginUser, verifyUser } = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

// ROUTES
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify-user', authenticate, verifyUser);
router.delete("/logout", logout);


module.exports = router;
