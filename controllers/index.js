const router = require('express').Router();
const apiRoutes = require('./api');
// const { Project } = require('../models/');


// api routes
router.use('/api', apiRoutes);

// list all projects from the database
router.get('/', async (req, res) => {
  try {
    const projectData = await Project.findAll({
      order: [['name', 'ASC']]
    });
    res.sendFile(path.join(__dirname, '../public/index.html')); // Send static landing page HTML file to client
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
