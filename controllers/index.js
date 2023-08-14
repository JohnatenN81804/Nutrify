const path = require('path');
const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
// const { Project } = require('../models/');


// api routes
router.use('/api', apiRoutes);

// send the static index homepage file to client browser
// router.get('/', (req, res) => {
//   const indexPath = path.join(__dirname, '../public/index.html');
//   res.sendFile(indexPath);
// });

// send the static index homepage file to client browser
router.get('/login', (req, res) => {
  const indexPath = path.join(__dirname, '../public/login.html');
  res.sendFile(indexPath);
});

// send the recipe box page
router.get('/recipebox', (req, res) => {
  const indexPath = path.join(__dirname, '../public/recipebox.html');
  res.sendFile(indexPath);
});

router.use('/', homeRoutes);

module.exports = router;
