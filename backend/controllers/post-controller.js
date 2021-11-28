const Post = require("../models/post");
const Discount = require("../models/discount");
const OrderedItems = require("../models/orderdItems")
const fs = require("fs");
const QR_CODE = require("qrcode");
const jwt = require("jsonwebtoken");
const os = require('os');
require("dotenv").config();

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const createOrderedItems = async (req, res) => {
  try {
    const orderItems = await OrderedItems.create({ orderId: req.body.orderId, buyerId: req.body.buyerId, carrierStatus: req.body.carrierStatus, items: req.body.items});
    console.log(orderItems, 'createOrderItems');
    if(orderdItems) {
      return res.status(201).json(orderItems);
    } else {
      return res.status(404).json("Error not saved");
    }
  } catch (error) {
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

const getQR_Code = async (req, res) => {
  try {
    const generateRandomInteger = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const code = generateRandomInteger(1000, 9999);
    const price = Math.floor(Math.random() * 15);

    const jwt_QR_Token = jwt.sign(
      { code, price },
      process.env.JWT_QR_CODE_KEY,
      { expiresIn: "15m" }
    );

    const networkInterfaces = os.networkInterfaces();

    const qr = await QR_CODE.toDataURL(
      `http://${networkInterfaces['Ethernet'][1]['address']}:8080/discount/${jwt_QR_Token}`
    );

    await Discount.create({ discount_token: jwt_QR_Token, code, price });
    console.log(jwt_QR_Token, "qrtoken");
    return res.status(200).json({ qr, jwt_QR_Token });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const discountCodes = async (req, res) => {
  try {
    const code = await Discount.findOne({ code: req.params.code });
    if (code != null) {
      return res.status(200).json(code);
    } else {
      return res.status(404).json({ message: false });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const delete_discountCodes = async (req, res) => {
  console.log('delet_des', req.params.id);
  try {
    await Discount.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Discount deleted!"});
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const discountToken = async (req, res) => {
  try {
    const jwt_QR_Token = req.params.token;

    const verifyToken = jwt.verify(jwt_QR_Token, process.env.JWT_QR_CODE_KEY);
    if (verifyToken) {
      return res.status(200).json(verifyToken);
    } else {
      return res.status(401).json("expired");
    }
  } catch (error) {
    res.status(404).json("Token expired");
  }
};

const getPostByID = async (req, res) => {
  try {
    const postByID = await Post.findById(req.params.id);
    return res.status(200).json(postByID);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const createPost = async (req, res) => {
  const post = req.body;
  console.log(post);
  console.log(req.file);
  const imageName = req.file.filename;
  post.image = imageName;

  try {
    await Post.create(post);
    res.status(201).json({ message: "Post created successfully!" });
  } catch (error) {
    res.status(404).json({ messag: error });
  }
};

const updatePost = async (req, res) => {
  let new_image = "";
  if (req.file) {
    new_image = req.file.filename;
    try {
      fs.unlinkSync("uploads/" + req.body.old_image);
    } catch (error) {
      console.log(error);
    }
  } else {
    new_image = req.body.old_image;
  }

  const newPost = req.body;
  newPost.image = new_image;

  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, newPost);
    res.status(200).json({ message: "Post Updated Successfully!" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const result = await Post.findByIdAndDelete(req.params.id);
    if (result.image != "") {
      try {
        fs.unlinkSync("uploads/" + result.image);
      } catch (error) {
        console.log(error);
      }
    }
    res.status(200).json({ message: "Post Deleted Successfully!" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const searchPosts = async (req, res) => {
  try {
    const search = await Post.find({
      title: new RegExp(req.params.title, "i"),
    });
    res.status(200).json(search);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

module.exports = {
  getPosts,
  getPostByID,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
  getQR_Code,
  discountToken,
  discountCodes,
  delete_discountCodes,
  getOrderedItems,
  createOrderedItems
};
