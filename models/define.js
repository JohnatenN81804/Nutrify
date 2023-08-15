
const { DataTypes } = require('sequelize');
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/define.js'); 

const sequelize = require('../config/connection');




const User = sequelize.define('User', {

})

const Recipe = sequelize.define('Recipe', {
  
});

const RecipeIngredients = sequelize.define('Recipe', {

})