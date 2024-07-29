const productSchema = require('../Modal/productSchema');

const Insert = async (req, res) => {
  try {
    const { name, description, brand, price, stock, condition, category } = req.body;

    
    const productImage = req.files.map((file)=>file.filename)

    const data = await new productSchema({
      seller_id: req.seller,
      category_id: category,
      name,
      description,
      brand,
      price,
      stock,
      condition,
      productImage,
      
    });

    console.log('Data:', data);

    const saveproduct = await data.save();
    console.log('Inserted successfully');
    res.send({ 'inserted successfully': true, saveproduct });
  } catch (error) {
    console.log('Error Occurred', error);
    res.status(500).json('Some internal error');
  }
};



const ViewSingle = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productSchema.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.log('Error Occurred', error);
    res.status(500).json('Some internal error');
  }
};



const View = async (req, res) => {
  try {
    const data = await productSchema.find();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log("Error Occured", error);
    res.status(500).json("some internal error");
  }
};
const ViewById = async (req, res) => {
  try {
    const productId = req.params.id; // Extract the product ID from the request parameters
    const data = await productSchema.findById(productId);

    if (!data) {
      // If the product is not found, return a 404 response
      return res.status(404).json({ error: 'Product not found' });
    }

    console.log(data);
    res.json(data);
  } catch (error) {
    console.log('Error Occurred', error);
    res.status(500).json('Some internal error');
  }
};

const View2 = async (req, res) => {
  try {
    
    const sellerId = req.query.seller_id;

    const filter = sellerId ? { seller_id: sellerId } : {};

    const data = await productSchema.find(filter);

    res.json(data);
  } catch (error) {
    console.log("Error Occurred", error);
    res.status(500).json("Some internal error");
  }
};

const Delete = async (req, res) => {
  try {
    let data = await productSchema.findById(req.params.id);
    if (!data) {
      console.log("data is not found");
      return res.status(404).send("data not exists");
    } else {
      data = await productSchema.findByIdAndDelete(req.params.id);
      console.log("data deleted successfully");
      res.json({ success: "sucessfully", "deleted data": data });
    }
  } catch (error) {
    console.log("Error Occured", error);
    res.status(500).json("some internal error");
  }
};

// const Update = async (req, res) => {
//   const { name, description, category, brand, price, stock ,condition} = req.body;
//   try {
//     const newdata = {};
//     if (name) [(newdata.name = name)];
//     if (category) [(newdata.category = category)];
//     if (stock) [(newdata.stock = stock)];
//     if (price) [(newdata.price = price)];
//     if (brand) [(newdata.brand = brand)];
//     if (brand) [(newdata.condition = condition)];
//     if (description) [(newdata.description = description)];

//     let data = await productSchema.findById(req.params.id);
//     if (!data) {
//       console.log("data is not found");
//       return res.status(404).send("data not exists");
//     } else {
//       data = await productSchema.findByIdAndUpdate(req.params.id, {
//         $set: newdata,
//       });
//       console.log("data updated successfully");
//       res.json({ success: "sucessfully", "updated data": data });
//     }
//   } catch (error) {
//     console.log("Error Occured", error);
//     res.status(500).json("some internal error");
//   }
// };

const Update = async (req, res) => {
  const { name, description, category, brand, price, stock, condition, status } = req.body;
  try {
    const newdata = {};
    if (name) newdata.name = name;
    if (category) newdata.category = category;
    if (stock) {
      newdata.stock = stock;

      
      newdata.status = stock > 0 ? 'In Stock' : 'Out of Stock';
    }
    if (price) newdata.price = price;
    if (brand) newdata.brand = brand;
    if (condition) newdata.condition = condition;
    if (description) newdata.description = description;
    if (status) newdata.status = status; 

    let data = await productSchema.findById(req.params.id);
    if (!data) {
      console.log("data is not found");
      return res.status(404).send("data not exists");
    } else {
      data = await productSchema.findByIdAndUpdate(req.params.id, {
        $set: newdata,
      });

      console.log("data updated successfully");
      res.json({ success: "successfully", "updated data": data });
    }
  } catch (error) {
    console.log("Error Occurred", error);
    res.status(500).json("some internal error");
  }
};



module.exports = { Insert, View, Delete, Update,ViewSingle,View2,ViewById };
