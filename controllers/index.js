const path = require('path');
const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes')
// const { Project } = require('../models/');


// api routes
router.use('/api', apiRoutes);

// send the static index homepage file to client browser
// router.get('/', (req, res) => {
//   const indexPath = path.join(__dirname, './views/layouts/test.html');
//   res.sendFile(indexPath);
//   console.log(res)
// });

router.use('/', homeRoutes)

module.exports = router;
