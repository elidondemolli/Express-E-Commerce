const OrderedItems = require("../models/orderdItems")
require("dotenv").config();

const createOrderedItems = async (req, res) => {
  try {
    const orderItems = await OrderedItems.create({ orderId: req.body.orderId, buyerId: req.body.buyerId, buyerName: req.body.buyerName, carrierStatus: req.body.carrierStatus, items: req.body.items});
    console.log(orderItems, 'createOrderItems');
    if(orderItems) {
      return res.status(201).json(orderItems);
    } else {
      return res.status(404).json("Error not saved");
    }
  } catch (error) {
    console.log(error, 'order')
    res.status(500).json({ message: error });
  }
}

const getOrderedItems = async (req, res) => {
  try {
    const orderItems = await OrderedItems.findOne({ orderId: req.params.orderId });
    console.log(orderItems, 'orderItemsGet');
    if(orderItems) {
      return res.status(201).json(orderItems);
    } else {
      return res.status(404).json("Not found order");
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

const updateOrderStatus = async (req, res) => {
  try {
    const result = await OrderedItems.updateOne({ orderId: req.params.id}, { $set: { carrierStatus: req.body.carrierStatus } }, { upsert: true});
    if(result) {
      return res.status(200).json({ message: "SUCCESS" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

const getAllOrderedItems = async (req, res) => {
  try {
    const orderedItems = await OrderedItems.find({});
    if(orderedItems) {
      return res.status(200).json(orderedItems);
    } else {
      return res.status(404).json({ message: "Could not find any ordered items"});
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

const deleteOrderItem = async (req, res) => {
  try {
    const orderdItems = await OrderedItems.findByIdAndDelete(req.params.orderId);
    return res.status(200).json('Order has been deleted');
  } catch (error) {
    console.log(error, 'order')
    res.status(500).json({ message: error });
  }
}

module.exports = {
  getOrderedItems,
  getAllOrderedItems,
  createOrderedItems,
  updateOrderStatus,
  deleteOrderItem
};
