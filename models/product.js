const db = require("./connection");

const Product = {
  getAll: (callback) => {
    db.query("SELECT * FROM product", (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  },
  getById: (id, callback) => {
    db.query("SELECT * FROM product WHERE id = ?", [id], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results[0]);
    });
  },

  createProduct: (productData, callback) => {
    db.query(
      "INSERT INTO product (name, description, price, type, stock, image_url) VALUES (?, ?, ?, ?, ?, ?)",
      [
        productData.name,
        productData.description,
        productData.price,
        productData.type,
        productData.stock,
        productData.image_url,
      ],
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, { insertId: result.insertId });
      }
    );
  },
  deleteProductById: (id, callback) => {
    db.query("DELETE FROM product WHERE id = ?", [id], (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    });
  },
};

module.exports = Product;
