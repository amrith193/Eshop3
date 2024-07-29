const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  product_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product"
  },
  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
 
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'], 
    default: 'pending',
  },


  shippingAddress: {
    type: Object,
    required: false,
  },

 remarks:{
  type:String,
  required:false,
 },

  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Order", orderSchema);
