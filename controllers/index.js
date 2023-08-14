const path = require('path');
const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');
// const { Project } = require('../models/');


// api routes
router.use('/api', apiRoutes);

// send the static index homepage file to client browser
router.get('/', (req, res) => {
  const indexPath = path.join(__dirname, '../public/index.html');
  res.sendFile(indexPath);
});


module.exports = router;
