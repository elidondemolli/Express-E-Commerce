const express = require('express');
const router = express.Router();

const { getUsers, getAllUsers, login, register, forgotPassword, resetPassword, deleteUser, getUserById, updateUser, cart, cartUser, cartUserdelete } = require('../controllers/user-controller')

router.get('/', getUsers);
router.get('/all', getAllUsers);
router.get('/getCart/:id', cartUser);
router.put('/add/:id', cart);
router.get('/:id', getUserById);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);
router.delete('/delete/cart/:userId/:id', cartUserdelete);
router.post('/login', login);
router.post('/register', register);
router.put('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

module.exports = router