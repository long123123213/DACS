const express = require('express');
const { register, login ,getUserInfo} = require('../controllers/authController');

const router = express.Router();
router.get("/user", getUserInfo);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
