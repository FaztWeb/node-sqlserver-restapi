import { getConnection, sql } from "../database/connection.js";

export const getProducts = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM products");
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewProduct = async (req, res) => {
  const { name, description, quantity = 0, price } = req.body;

  if (description == null || name == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("description", sql.Text, description)
      .input("quantity", sql.Int, quantity)
      .input("price", sql.Decimal, price)
      .query(
        "INSERT INTO products (name, description, quantity, price) VALUES (@name,@description,@quantity,@price); SELECT SCOPE_IDENTITY() as id"
      );

    res.json({
      name,
      description,
      quantity,
      price,
      id: result.recordset[0].id,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("SELECT * FROM products WHERE id = @id");

    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("DELETE FROM products WHERE id = @id");

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getTotalProducts = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT COUNT(*) FROM products");
  res.json(result.recordset[0][""]);
};

export const updateProductById = async (req, res) => {
  const { description, name, quantity = 0, price } = req.body;

  if (
    description == null ||
    name == null ||
    quantity == null ||
    price == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", req.params.id)
      .input("name", sql.VarChar, name)
      .input("description", sql.Text, description)
      .input("quantity", sql.Int, quantity)
      .input("price", sql.Decimal, price)
      .query(
        "UPDATE products SET name = @name, description = @description, quantity = @quantity, price = @price WHERE id = @id"
      );

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    res.json({ name, description, quantity, price, id: req.params.id });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
