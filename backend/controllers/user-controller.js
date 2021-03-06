const User = require("../models/user");
const Post = require("../models/post");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();

const getUsers = async (req, res) => {
  try {
    const result = await User.findById(req.user.id).select("-password");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getUserById = async (req, res) => {
  try {
    const result = await User.findById(req.params.id).select("-password");
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await User.find().select("-password");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const result = await User.updateOne(
      { _id: req.params.id },
      { $set: { role: req.body.role } },
      { upsert: true }
    );
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "USER DOES NOT EXIST" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };

    const jwtToken = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: "2h",
    });

    return res.status(200).json({ jwtToken, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({ message: "USER ALREADY EXISTS" });
    }

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.role = "Client";

    const payload = {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };

    const jwtToken = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: "2h",
    });

    await user.save();

    return res.status(200).json({ jwtToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res
      .status(400)
      .json({ message: "User with this email doesnt exist." });
  }

  const token = jwt.sign(
    { _id: user._id },
    process.env.JWT_FORGOT_PASSWORD_KEY,
    {
      expiresIn: "20m",
    }
  );

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  let mailOptions = {
    from: "neuerm878@gmail.com",
    to: email,
    subject: "Express Forgot Password Account",
    html: `<p>Someone (hopefully you) has requested a password reset for your Express account. <br> Follow the link below to set a new password: <br>
                <a href="http://localhost:8080/reset-password/${token}">http://www.express.com/forgot-password</a> 
                <br>
                If you don't wish to reset your password, disregard this email and no action will be taken.
                <br>
                The Express Team
                <p>`,
  };

  try {
    const result = await user.updateOne({ resetToken: token });
    if (result) {
      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log("Forgot Password Email Sent!");
        }
      });
      return res.status(200).json({ message: "sent" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const resetPassword = async (req, res) => {
  const resetToken = req.params.token;

  const salt = await bcrypt.genSalt(10);
  req.body.newPass = await bcrypt.hash(req.body.newPass, salt);
  try {
    if (!resetToken) {
      return res.status(403).json({ message: "Token invalid or expired." });
    }

    const verifyToken = jwt.verify(
      resetToken,
      process.env.JWT_FORGOT_PASSWORD_KEY
    );
    if (verifyToken) {
      await User.findOneAndUpdate(
        { resetToken: resetToken },
        { password: req.body.newPass, resetToken: null }
      );
      return res.status(200).json({ message: "Password has been updated" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const cartDeleteAll = async (req, res) => {
  console.log(req.params, 'delAll')
  try {
    const result = await User.updateMany({ _id: req.params.userId }, { $unset: { cart: ""} });
    if(result) {
      return res.status(201).json('Cart deleted');
    } else {
      return res.status(404).json('Error cant find cart');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json('Error')
  }
}

const cart = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await Post.findById(req.body.product._id);

    const newCart = {
      product: post._id,
      title: post.title,
      image: post.image,
      price: post.price,
      category: post.category,
      quantity: 1,
    };

    let result = await User.findOne({ _id: id });
    let productInCart = result.cart.find((item) => {
      if (item.product.equals(newCart.product)) {
        return item;
      }
    });

    if (productInCart) {
      await User.updateOne(
        { _id: id, "cart._id": productInCart._id },
        { $set: { "cart.$.quantity": productInCart.quantity + 1 } }
      );
      return res.status(200).json({ message: "products edited" });
    } else {
      result.cart.unshift(newCart);
      await result.save();
      return res.status(200).json({ message: "ADDED" });
    }
  } catch (error) {
    console.log(error, 'addcart')
    return res.status(400).json({ message: error });
  }
};

const cartUser = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await User.findById(id).populate("cart");

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const cartUserdelete = async (req, res) => {
  try {
    const result = await User.findById(req.params.userId);
    if (result) {
      const removeIndex = result.cart
        .map((item) => item._id)
        .indexOf(req.params.id);
      result.cart.splice(removeIndex, 1);
      result.save();
      res.status(200).json({ message: "Item Removed Successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
  }
};

module.exports = {
  getUsers,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  login,
  register,
  forgotPassword,
  resetPassword,
  cart,
  cartUser,
  cartUserdelete,
  cartDeleteAll,
};
