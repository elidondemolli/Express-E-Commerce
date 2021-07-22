const express = require('express');
const router = express.Router();

const { getUsers, login, register, forgotPassword, resetPassword } = require('../controllers/user-controller')

router.get('/', getUsers);
router.post('/login', login);
router.post('/register', register);
router.put('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

module.exports = router