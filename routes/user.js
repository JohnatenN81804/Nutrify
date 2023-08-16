
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const authenticateUser = require('../middleware/authenticateUser');
const { User } = require("../models/define")

// Register for the app
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username: username,
      password: hashedPassword
    });

    if (!newUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Log in to the app with your personal information
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: {
        username: username
      }
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Authenticates the user for login 
router.get('/protected', authenticateUser, (req, res) => {
  res.json({ message: 'You are an authenticated user' });
});

module.exports = router;

