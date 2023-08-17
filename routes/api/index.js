const router = require('express').Router();
const userRoutes = require("./userRoutes");
const recipeBookRoutes = require('./recipeBox');

router.use("/user", userRoutes);
router.use("/recipeBox", recipeBookRoutes);

module.exports = router;
