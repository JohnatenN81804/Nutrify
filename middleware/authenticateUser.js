

const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models/define.js'); // Import the User model
const router = express.Router();

// User registration route
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    await User.create({ email, password_hash: hashedPassword });

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error occurred' });
  }
});

// User login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Set up a session or token as needed
    // For example, create a session: req.session.user = { userId: user.id, email: user.email };

    return res.status(200).json({ message: 'Authentication successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error occurred' });
  }
});

module.exports = router;