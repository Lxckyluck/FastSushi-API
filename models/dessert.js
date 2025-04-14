const db = require("./connections");

const dessert = {
  // SQL QUERY to get all desserts using promise
  getdessert: async () => {
    try {
      const [results] = await db.query("SELECT * FROM product where type = 'dessert'");
      return results;
    } catch (err) {
      console.error("Error fetching all dessert:", err);
      throw new Error("Error fetching all dessert");
    }
  },

  // SQL QUERY to get a dessert by its ID using promise
  getdessertById: async (id) => {
    try {
      const [results] = await db.query("SELECT * FROM product WHERE type = 'dessert' AND id = ?", [
        id,
      ]);
      if (results.length === 0) {
        throw new Error("dessert not found");
      }
      return results[0];
    } catch (err) {
      console.error(`Error fetching dessert with ID ${id}:`, err);
      throw new Error("Error fetching dessert");
    }
  },

  // SQL QUERY to create a new dessert using promise
  createdessert: async (dessertData) => {
    const { name, description, price, stock, image_url } = dessertData;
    try {
      const [result] = await db.query(
        "INSERT INTO product (name, description, price, type, stock, image_url) VALUES (?, ?, ?, 'dessert', ?, ?)",
        [name, description, price, stock, image_url]
      );
      return result.insertId;
    } catch (err) {
      console.error("Error creating dessert:", err);
      throw new Error("Error while creating the dessert");
    }
  },

  // SQL QUERY to delete a dessert by its ID using promise
  deletedessertById: async (id) => {
    try {
      const [result] = await db.query("DELETE FROM product WHERE type = 'dessert' AND id = ?", [id]);
      return result;
    } catch (err) {
      console.error(`Error deleting dessert with ID ${id}:`, err);
      throw new Error("Error deleting the dessert");
    }
  },
};

module.exports = dessert;
