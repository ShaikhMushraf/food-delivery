const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin'); // Admin model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecreat = "MynameisShaikhMushrafIbrahim$#"



// Admin sign-up
router.post('/adminsignup', async (req, res) => {
  try {
    const { email, password, city } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ success: false, message: 'Admin already exists' });

    const salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(req.body.password, salt)


    const newAdmin = new Admin({ email, password:hashedPassword, city });
    await newAdmin.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin sign-in
router.post('/adminsignin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    // compare password with hashed password in database
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid Credentials' });

    // jwt token generated
    const data = {
        admin: {
            id: admin.id
        }
    };
    const authToken = jwt.sign(data, jwtSecreat);

    res.status(200).json({ success: true, authToken: authToken });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
