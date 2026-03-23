CREATE TABLE users(
 id SERIAL PRIMARY KEY,
 username TEXT UNIQUE,
 password_hash TEXT
);

CREATE TABLE products(
 id SERIAL PRIMARY KEY,
 name TEXT,
 price INT,
 image_url TEXT,
 description TEXT
);

CREATE TABLE reviews(
 id SERIAL PRIMARY KEY,
 product_id INT,
 user_id INT,
 review TEXT
);


INSERT INTO products (name,price,image_url,description) VALUES

('Toyota Camry 2024',35000,'/images/camry.jpg',
'Reliable mid-size sedan known for comfort and fuel efficiency'),

('BMW M4 Competition',74000,'/images/bmw.jpg',
'High-performance sports coupe with aggressive design'),

('Tesla Model 3',42000,'/images/tesla.jpg',
'Popular electric vehicle with advanced technology'),

('Ford Mustang GT',55000,'/images/mustang.jpg',
'Iconic American muscle car with powerful V8 engine');