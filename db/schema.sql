

DROP DATABASE IF EXISTS nutrition_db;


CREATE DATABASE nutrition_db;


USE nutrition_db;


CREATE TABLE Recipes (
  recipe_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  url VARCHAR(500),
  image_url VARCHAR(300)
);


CREATE TABLE Users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(250) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL
);


CREATE TABLE RecipeIngredients (
  recipe_id INT,
  ingredient_name VARCHAR(100) NOT NULL,
  calories DECIMAL(8, 2),
  protein DECIMAL(8, 2),
  carbs DECIMAL(8, 2),
  fat DECIMAL(8, 2),
  PRIMARY KEY (recipe_id, ingredient_name),
  FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id)
);