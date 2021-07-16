const express = require('express');
const router = express.Router();

const { getUsers, login, register } = require('../controllers/user-controller')

router.get('/', getUsers);
router.post('/login', login);
router.post('/register', register);

module.exports = router