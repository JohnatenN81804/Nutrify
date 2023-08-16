const path = require('path');
const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');

// api routes
router.use('/api', apiRoutes);

// send the static login.html file to client
router.get('/login', (req, res) => {
  const indexPath = path.join(__dirname, '../public/login.html');
  res.sendFile(indexPath); // sending static file route
});

// send the static login.html file to client
router.get('/signup', (req, res) => {
  const indexPath = path.join(__dirname, '../public/signup.html');
  res.sendFile(indexPath); // sending static file route
});


// render search results page via handlebars
router.use('/search', (req, res) => {
  res.render('searchResults'); // rendering then sending searchResults.handlebars page
});

// send static recipebox.html file to client
router.use('/recipebox', (req, res) => {
  const indexPath = path.join(__dirname, '../public/recipebox.html');
  res.sendFile(indexPath); // sending static file route
});


// send static homepage.html
router.use('/', (req, res) => {
  const indexPath = path.join(__dirname, '../public/homepage.html');
  res.sendFile(indexPath); // sending static file route
});

module.exports = router;
