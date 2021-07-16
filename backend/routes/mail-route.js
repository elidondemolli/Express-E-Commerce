const express = require('express');
const router = express.Router();

const { mail } = require('../controllers/mail-controller');

router.post('/', mail);

module.exports = router