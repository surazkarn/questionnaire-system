const jwt = require('jsonwebtoken');
const config = require('../config');
const axios = require('axios');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');


exports.welcome = (req, res) => {
  res.status(200).json({ success: true, message: 'API successfully called' });
};

exports.signup = async (req, res) => {
    try {
      const { name, email, password, phone_number } = req.body;
  
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
      }
  
      // Generate the id
      const id = uuidv4();
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user with the generated id
      const newUser = new User({
        id,
        name,
        email,
        password: hashedPassword,
        phone_number,
      });
      await newUser.save();
  
      res.status(200).json({ success: true, message: 'Signed up successfully' });
    } catch (error) {
      console.error('Error in signup:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });

    // Call external API to get message
    const response = await axios.get('https://api.catboys.com/catboy');
    //console.log(response.data);
    const message = response.data;

    res.status(200).json({ success: true, message , token});
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


exports.editPhoneNumber = async (req, res) => {
  try {
    const { phone_number } = req.body;

    // Get the user ID from authentication
    const userId = req.user.id;
    //console.log(userId)

    // Update the phone number
    await User.findByIdAndUpdate(userId, { phone_number });

    res.status(200).json({ success: true, message: 'Phone number changed/added successfully' });
  } catch (error) {
    console.error('Error in editPhoneNumber:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = exports;
