const db = require("./connections");

const Product = {
  // SQL QUERY to get all products using promise
  getAll: () => {
    return db
      .query("SELECT * FROM product")
      .then(([results]) => results)
      .catch((err) => {
        console.error("Error fetching all products:", err);
        throw new Error("Error fetching all products");
      });
  },

  // SQL QUERY to get a product by its ID using promise
  getById: (id) => {
    return db
      .query("SELECT * FROM product WHERE id = ?", [id])
      .then(([results]) => {
        if (results.length === 0) {
          throw new Error("Product not found");
        }
        return results[0];
      })
      .catch((err) => {
        console.error(`Error fetching product with ID ${id}:`, err);
        throw new Error("Error fetching product");
      });
  },

  // SQL QUERY to create a new product using promise
  createProduct: (productData) => {
    const { name, description, price, type, stock, image_url } = productData;
    return db
      .query(
        "INSERT INTO product (name, description, price, type, stock, image_url) VALUES (?, ?, ?, ?, ?, ?)",
        [name, description, price, type, stock, image_url]
      )
      .then(([result]) => result.insertId)
      .catch((err) => {
        console.error("Error creating product:", err);
        throw new Error("Error while creating the product");
      });
  },

  // SQL QUERY to delete a product by its ID using promise
  deleteProductById: (id) => {
    return db
      .query("DELETE FROM product WHERE id = ?", [id])
      .then(([result]) => result)
      .catch((err) => {
        console.error(`Error deleting product with ID ${id}:`, err);
        throw new Error("Error deleting the product");
      });
  },
};

module.exports = Product;
