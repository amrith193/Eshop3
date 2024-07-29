

const user = require("../Modal/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../Modal/userSchema");
const productSchema = require('../Modal/productSchema');
const JWT_SECRET = "amrith";

const Register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const image = req.file.filename;

    let seller = await userSchema.findOne({ email });

    if (seller) {
      return res.json({ error: "Email already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const data = await new userSchema({
        name,
        email,
        phone,
        password: hashedPassword,
        image,
        userType: 'seller',
        approvalStatus: 'pending',
      });
      const saveRegister = await data.save();

      console.log("Inserted successfully");
      res.json({ "inserted successfully": true, saveRegister });
    }
  } catch (error) {
    console.error("Internal server error: " + error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const Update = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, phone, password, image } = req.body;

    let user = await userSchema.findById(userId);

    if (!user) {
      console.log('User not found with ID:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields with new values
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    // If a new password is provided, hash and update it
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    // If a new image is provided, update it
    if (image) {
      user.image = image;
    }

    // Save the updated user
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const GetPendingSellers = async (req, res) => {
  try {
    // Assuming your Seller model has a field 'approvalStatus'
    const pendingSellers = await userSchema.find({ approvalStatus: 'pending' });

    // Send the pending sellers as a JSON response
    res.json(pendingSellers);
  } catch (error) {
    console.error('Error fetching pending sellers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const AdminApproveSeller = async (req, res) => {
  const { userId, approvalStatus } = req.params;

  try {
    const user = await userSchema.findByIdAndUpdate(
      userId,
      { approvalStatus },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



const Login = async (req, res) => {
  const { email, password } = req.body; // Corrected 'passward' to 'password'
  console.log(email);
  console.log(password);
  try {
    let seller = await userSchema.findOne({ email });
    if (!seller) {
      return res.json({ error: "Invalid email" });
    }

    const passwordCompare = await bcrypt.compare(password, seller.password); // Corrected 'passward' to 'password'
    if (!passwordCompare) {
      const success = false;
      return res.json({ success, error: "Invalid password" });
    }

    const data = seller.id;
    console.log(seller.id);
    const authtoken = jwt.sign(data, JWT_SECRET);
    const success = true;
    res.json({ success, authtoken, seller });
  } catch (error) {
    console.log(error);
    console.error(error.message);
    res.send("Internal server error");
  }
};

const ViewStatus = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userSchema.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ userId: user._id, approvalStatus: user.approvalStatus });
  } catch (error) {
    console.log("Error Occurred", error);
    res.status(500).json("Some internal error");
  }
};


const Singleview = async (req,res)=>{
  try {
    let data = await userSchema.findById(req.params.id)
    if(!data ){
      res.status(404).send("not found")
    }
  else{
    res.json(data)
  
  }
  } catch (error) {
    console.error("error ocured"+ error)
    res.send("some error ocured")
  }
}

const View = async (req, res) => {
  try {
    const data = await userSchema.find();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log("Error Occured", error);
    res.status(500).json("some internal error");
  }
};

const Delete = async (req, res) => {
  try {
    let data = await userSchema.findById(req.params.id);
    if (!data) {
      console.log("data is not found");
      return res.status(404).send("data not exists");
    } else {
      data = await userSchema.findByIdAndDelete(req.params.id);
      console.log("data deleted successfully");
      res.json({ success: "sucessfully", "deleted data": data });
    }
  } catch (error) {
    console.log("Error Occured", error);
    res.status(500).json("some internal error");
  }
};



module.exports = { Register, Login,Singleview ,View,Delete,AdminApproveSeller,GetPendingSellers,ViewStatus,Update};
