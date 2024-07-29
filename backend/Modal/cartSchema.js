const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Update 'Seller' with the correct reference model name
  },
  quantity: {
     type : Number,
      required: false
    },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Cart", cartSchema);
