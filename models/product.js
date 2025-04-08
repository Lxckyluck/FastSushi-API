const db = require("./connections");

const Product = {
  // SQL QUERY to get all products
  getAll: (callback) => {
    db.query("SELECT * FROM product", (err, results) => {
      if (err) {
        console.error("Error fetching all products:", err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  // SQL QUERY to get a product by its ID
  getById: (id, callback) => {
    db.query("SELECT * FROM product WHERE id = ?", [id], (err, results) => {
      if (err) {
        console.error(`Error fetching product with ID ${id}:`, err);
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(new Error("Product not found"), null);
      }
      callback(null, results[0]);
    });
  },

  // SQL QUERY to create a new product
  createProduct: (productData, callback) => {
    const { name, description, price, type, stock, image_url } = productData;
    db.query(
      "INSERT INTO product (name, description, price, type, stock, image_url) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, price, type, stock, image_url],
      (err, result) => {
        if (err) {
          console.error("Error creating product:", err);
          return callback(err, null);
        }
        callback(null, { insertId: result.insertId });
      }
    );
  },

  // SQL QUERY to delete a product by its ID
  deleteProductById: (id, callback) => {
    db.query("DELETE FROM product WHERE id = ?", [id], (err, result) => {
      if (err) {
        console.error(`Error deleting product with ID ${id}:`, err);
        return callback(err, null);
      }
      callback(null, result);
    });
  },
};

module.exports = Product;
