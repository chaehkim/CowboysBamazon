
-- Create Database
CREATE DATABASE cowboysBamazon;

USE cowboysBamazon;

-- Create table
CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

-- Seed data into table

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("8 - Troy Aikman", "Jerseys", 129.95, 108),
  ("22 - Emmit Smith", "Jerseys", 129.95, 122),
  ("88 - Michael Irvin", "Jerseys", 129.95, 188),
  ("82 - Jason Wiiten", "Jerseys", 89.95, 182),
  ("9 - Tony Romo", "Jerseys", 89.95, 109),
  ("94 -Demarcus Ware", "Jerseys", 89.95, 194),
  ("21 - Ezekiel Elliot", "Jerseys", 89.95, 121),
  ("28 - Darren Woodson", "Jerseys", 129.95, 128),
  ("24 - Everson Walls", "Jerseys", 129.95, 124),
  ("88 - Drew Pearson", "Jerseys", 129.95, 124),
  ("24 - Everson Walls", "Jerseys", 129.95, 124)

-- Verify seed data
SELECT * FROM products;
-- 11 records returned.
