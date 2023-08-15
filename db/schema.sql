
DROP DATABASE IF EXISTS nutrition_db;


CREATE DATABASE nutrition_db;


CREATE TABLE Recipes (
  recipe_id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  url VARCHAR(500),
  image_url VARCHAR(300),
);

CREATE TABLE Users (
  user_id INT PRIMARY KEY,
  email VARCHAR(30),
  password VARCHAR(30),
);

CREATE TABLE RecipeIngrediants (
  recipe_id INT PRIMARY KEY,
  calories DECIMAL(8, 2),
  protein DECIMAL(8, 2),
  carbs DECIMAL(8, 2),
  fat DECIMAL(8, 2)
);