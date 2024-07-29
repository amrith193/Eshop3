
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../Modal/userSchema');

const JWT_SECRET = 'amrith'; 

const setAdminCredentials = async () => {
    const adminEmail = 'admin'; 
    const adminPassword = 'admin'; 
  
    try {
      let adminUser = await userSchema.findOne({ email: adminEmail });
  
   
      if (!adminUser) {

        const hashedPassword = await bcrypt.hash(adminPassword, 10);
  
        adminUser = new userSchema({
          email: adminEmail,
          password: hashedPassword,
      
        });
  
        await adminUser.save();
        console.log('Admin user created successfully');
      } else {
        console.log('Admin user already exists');
      }
    } catch (error) {
      console.error('Error setting up admin credentials:', error);
    }
  };
  setAdminCredentials();
  
 
router.post('/admin-login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const adminUser = await userSchema.findOne({ email, });

    if (!adminUser) {
      return res.json({ error: 'Invalid credentials' });
    }

    const passwordCompare = await bcrypt.compare(password, adminUser.password);

    if (!passwordCompare) {
      const success = false;
      return res.json({ success, error: 'Invalid credentials' });
    }

    const data = adminUser.id;
    const authtoken = jwt.sign(data, JWT_SECRET);
    const success = true;
    res.json({ success, authtoken, adminUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
