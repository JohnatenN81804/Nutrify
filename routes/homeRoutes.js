const path = require('path');
const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authenticateUser');

// send the static login.html file to client
router.get('/login', (req, res) => {
  const filePath = path.join(__dirname, '../public/login.html');
  res.sendFile(filePath);
});

// send the static login.html file to client
router.get('/signup', (req, res) => {
  const filePath = path.join(__dirname, '../public/signup.html');
  res.sendFile(filePath);
});

// render search results page via handlebars
router.use('/search', (req, res) => {
  res.render('searchResults');
});

// send static recipebox.html file to client
router.use('/recipebox', authenticateUser, (req, res) => {

  const filePath = path.join(__dirname, '../public/recipebox.html');
  res.sendFile(filePath);
});

// send static homepage.html
router.use('/', (req, res) => {
  const filePath = path.join(__dirname, '../public/homepage.html');
  res.sendFile(filePath);
});

module.exports = router;