const Discount = require("../models/discount");
const QR_CODE = require("qrcode");
const jwt = require("jsonwebtoken");
const os = require('os');
require("dotenv").config();

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
      `http://${networkInterfaces['Wi-Fi'][1]['address']}:8080/discount/${jwt_QR_Token}`
    );

    await Discount.create({ discount_token: jwt_QR_Token, code, price });
    console.log(jwt_QR_Token, "qrtoken");
    return res.status(200).json({ qr, jwt_QR_Token });
  } catch (error) {
    console.log('error', error)
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

module.exports = {
  getQR_Code,
  discountToken,
  discountCodes,
  delete_discountCodes
};
