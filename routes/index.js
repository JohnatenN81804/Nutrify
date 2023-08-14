const path = require('path');
const express = require('express');
const router = express.Router();

// Import other routes if needed
// const apiRoutes = require('./api');

// Use API routes if applicable
// router.use('/api', apiRoutes);

// Serve index.html using a GET route
router.get('/', (req, res) => {
  const indexPath = path.join(__dirname, '../public/index.html');
  res.sendFile(indexPath);
});

module.exports = router;