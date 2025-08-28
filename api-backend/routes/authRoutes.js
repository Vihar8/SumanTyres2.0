const express = require('express');
const router = express.Router();
const { signup, login, getProfile} = require('../controllers/auth');  // Ensure you're importing the correct functions
const { authenticateUser } = require('../middlewares/authMiddleware');

router.post('/signup', signup); 
router.post('/login', login);
router.post('/profile', authenticateUser, getProfile);


module.exports = router;
