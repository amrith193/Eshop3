
const orderSchema = require('../Modal/orderSchema');
const Order = require('../Modal/orderSchema');


const createOrder = async (req, res) => {
    try {
      const { product_id, user_id,  shippingAddress,
        remarks,} = req.body;
  
      const data = new Order({
        product_id,
        user_id,
        shippingAddress,
        remarks,
       
      });
  
      const savedOrderItem = await data.save();
  
      console.log('Inserted successfully');
      res.status(201).json({ success: true, data: savedOrderItem });
    } catch (error) {
      console.error('Error occurred during insert', error);
      res.status(500).json({ success: false, message: 'Internal server error during insert' });
    }
  };
  

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate(["user_id","product_id"]);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllOrdersview = async (req, res) => {
  try {
    const userId = req.query.user_id; // Assuming user_id is passed as a query parameter

    // If userId is provided, filter completed orders by user_id; otherwise, fetch all completed orders
    const query = userId ? { user_id: userId, status: 'completed' } : { status: 'completed' };

    const orders = await Order.find(query).populate(["user_id", "product_id"]);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllOrdersadmin = async (req, res) => {
  try {
    const orders = await Order.find().populate([{ path: 'user_id' }, { path: 'product_id', populate: 'seller_id' }]);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const view = async (req,res)=>{
  try {
    const data = await orderSchema.find()
    .populate({
      path : 'product_id',
      populate:
        {
          path :'seller_id'
        }
    }).populate("user_id")
    console.log(data);
    res.json(data)
  } catch (error) {
    console.log(error);
  }
}

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const updateOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body; 

       const allowedStatusValues = ['pending', 'processing', 'completed', 'cancelled'];
    if (!allowedStatusValues.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

   

    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getAllOrdersview,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  getAllOrdersadmin,
  view,
 
};
