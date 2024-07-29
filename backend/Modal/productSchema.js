const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  location_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
  },
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
  },
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  brand: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  stock: {
    type: Number,
    required: false,
  },
  condition: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: ['In Stock', 'Out of Stock'],
    default: 'In Stock', 
  },
  productImage: [
    {
      type: String,
      require: false,
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
