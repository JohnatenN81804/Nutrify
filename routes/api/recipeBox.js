const express = require('express');
const router = express.Router();

// router.post() // create the POST route
router.post('/', (req, res) => {
  res.status(200).json({ message: 'working'});
  // write code to store data from post into database via sequelize
});

module.exports = router;