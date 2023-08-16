const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the RecipeIngredients model
const RecipeIngredients = sequelize.define('RecipeIngredients', {
  ingredient_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  calories: {
    type: DataTypes.DECIMAL(8, 2),
  },
  protein: {
    type: DataTypes.DECIMAL(8, 2),
  },
  carbs: {
    type: DataTypes.DECIMAL(8, 2),
  },
  fat: {
    type: DataTypes.DECIMAL(8, 2),
  },
});

// Define the User model
const User = sequelize.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(250),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

// Define the Recipe model and its association with RecipeIngredients and User
const Recipe = sequelize.define('Recipe', {
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING(500),
  },
  image_url: {
    type: DataTypes.STRING(300),
  },
});

// Establish associations between models
User.hasMany(Recipe, {
  foreignKey: 'user_id',
});
Recipe.belongsTo(User, {
  foreignKey: 'user_id',
});
Recipe.hasMany(RecipeIngredients, {
  foreignKey: 'recipe_id',
});

// Export the models
module.exports = { User, Recipe, RecipeIngredients };