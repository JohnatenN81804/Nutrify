

const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models/define.js'); // Import the User model
const router = express.Router();

router.use((err, req, res, next) => {
  console.log("auth user eventually")
  next()
  //res.status(500).json({ message: 'An internal server error occurred.' });
});


module.exports = router;