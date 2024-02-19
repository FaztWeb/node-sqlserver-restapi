 -- CREATE DATABASE webstore;

-- USE webstore;

-- DROP TABLE IF EXISTS products;

-- CREATE TABLE products (
--   id INT IDENTITY(1,1) PRIMARY KEY,
--   name VARCHAR(100),
--   price DECIMAL(10, 2),
--   quantity INT,
--   description TEXT
-- );

-- EXEC sp_columns 'products';


-- SELECT TOP(500) * FROM [webstore].[dbo].[Products];

-- INSERT DATA
-- INSERT INTO [webstore].[dbo].[Products] (name) VALUES('product2');

-- GET THE LAST INSERT ID
-- SELECT SCOPE_IDENTITY()

SELECT COUNT(*) FROM webstore.dbo.Products;


 SELECT USER_NAME();

