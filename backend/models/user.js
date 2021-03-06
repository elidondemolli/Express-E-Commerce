const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  resetToken: {
    type: String,
  },
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
      title: {
        type: String,
      },
      price: {
        type: Number
      },
      category: {
        type: String,
      },
      image: {
        type: String,
      },
      quantity:{
        type: Number,
        default: 1
      }
    }
  ],
});

module.exports = mongoose.model('User', userSchema);