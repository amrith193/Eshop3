const cartSchema = require('../Modal/cartSchema');
const mongoose = require('mongoose');


const insert = async (req, res) => {
  try {
    const { product_id, seller_id, quantity } = req.body;

    const data = new cartSchema({
      product_id,
      seller_id,
      quantity,
    });

    const savedCartItem = await data.save();

    console.log('Inserted successfully');
    res.status(201).json({ success: true, data: savedCartItem });
  } catch (error) {
    console.error('Error occurred during insert', error);
    res.status(500).json({ success: false, message: 'Internal server error during insert' });
  }
};

const viewSingle = async (req, res) => {
  try {
    const seller_id = req.params.id;

    // Assuming you want to find all cart items associated with the seller_id
    const cartItems = await cartSchema.find({ seller_id });

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: 'Cart items not found for the seller' });
    }

    res.json(cartItems);
  } catch (error) {
    console.error('Error occurred during viewSingle', error);
    res.status(500).json({ success: false, message: 'Internal server error during viewSingle' });
  }
};


const viewAll = async (req, res) => {
  try {
    const cartItems = await cartSchema.find();
    res.json(cartItems);
  } catch (error) {
    console.error('Error occurred during viewAll', error);
    res.status(500).json({ success: false, message: 'Internal server error during viewAll' });
  }
};
const remove = async (req, res) => {
  try {
    const cartItemId = req.params.id;

    const cartItem = await cartSchema.findById(cartItemId);
    if (!cartItem) {
      console.log(`Cart item with ID ${cartItemId} not found`);
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }

    const deletedCartItem = await cartSchema.findByIdAndDelete(cartItemId);

    console.log('Cart item deleted successfully');
    res.json({ success: true, message: 'Cart item deleted successfully', deletedCartItem });
  } catch (error) {
    console.error('Error occurred during delete', error);
    res.status(500).json({ success: false, message: 'Internal server error during delete' });
  }
};

const removeall= async (req, res) => {
  try {
    // Remove all cart items
    const deletedCartItems = await Cart.deleteMany({});

    console.log('All cart items deleted successfully');
    res.json({ success: true, message: 'All cart items deleted successfully', deletedCartItems });
  } catch (error) {
    console.error('Error occurred during delete all', error);
    res.status(500).json({ success: false, message: 'Internal server error during delete all' });
  }
};


const update = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const { quantity } = req.body;

    const updatedCartItem = await cartSchema.findByIdAndUpdate(
      cartItemId,
      { $set: { quantity } },
      { new: true }
    );

    if (!updatedCartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    console.log('Cart item updated successfully');
    res.json({ success: true, data: updatedCartItem });
  } catch (error) {
    console.error('Error occurred during update', error);
    res.status(500).json({ success: false, message: 'Internal server error during update' });
  }
};

module.exports = { insert, viewSingle, viewAll, remove, update ,removeall};
