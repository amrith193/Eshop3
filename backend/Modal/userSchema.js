const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  cart_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
  },
  name: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  phone: {
    type: Number,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['buyer', 'seller'],
    default: 'buyer',
  },
  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  status_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'false', // Not sure if 'false' is the correct reference, you might want to update it
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('User', userSchema);
