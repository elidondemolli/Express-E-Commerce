const express = require('express');
const router = express.Router();
const { createOrderedItems, getOrderedItems, getAllOrderedItems, updateOrderStatus, deleteOrderItem } = require('../controllers/order-controller')

router.get('/orderedItems', getAllOrderedItems);
router.post('/order', createOrderedItems);
router.delete('/orderTrack/:orderId', deleteOrderItem);
router.patch('/updateOrderStatus/:id', updateOrderStatus);
router.get('/orderTrack/:orderId', getOrderedItems);

module.exports = router;