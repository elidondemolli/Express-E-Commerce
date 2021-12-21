const express = require('express');
const router = express.Router();
const { getQR_Code, discountToken, discountCodes, delete_discountCodes } = require('../controllers/qr-code-controller')

router.post('/qr/:id', getQR_Code);
router.delete('/discount-delete/:id', delete_discountCodes);
router.get('/code/:code', discountCodes);
router.get('/disc/:token', discountToken);

module.exports = router;