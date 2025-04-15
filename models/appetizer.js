const db = require("./connections");

const Appetizer = {
  // SQL QUERY to get all appetizers using promise
  getAppetizer: async () => {
    try {
      const [results] = await db.query("SELECT * FROM product where type = 'appetizer'");
      return results;
    } catch (err) {
      console.error("Error fetching all appetizer:", err);
      throw new Error("Error fetching all appetizer");
    }
  },

  // SQL QUERY to get a appetizer by its ID using promise
  getAppetizerById: async (id) => {
    try {
      const [results] = await db.query("SELECT * FROM product WHERE type = 'appetizer' AND id = ?", [
        id,
      ]);
      if (results.length === 0) {
        throw new Error("Appetizer not found");
      }
      return results[0];
    } catch (err) {
      console.error(`Error fetching appetizer with ID ${id}:`, err);
      throw new Error("Error fetching appetizer");
    }
  },

  // SQL QUERY to create a new appetizer using promise
  createAppetizer: async (appetizerData) => {
    const { name, description, price, stock, image_url } = appetizerData;
    try {
      const [result] = await db.query(
        "INSERT INTO product (name, description, price, type, stock, image_url) VALUES (?, ?, ?, 'appetizer', ?, ?)",
        [name, description, price, stock, image_url]
      );
      return result.insertId;
    } catch (err) {
      console.error("Error creating appetizer:", err);
      throw new Error("Error while creating the appetizer");
    }
  },

  // SQL QUERY for update an appetizer
  updateAppetizer: async (id, AppetizerData) => {
    try {
      let updates = [];
      let values = [];

      if (AppetizerData.name) {
        updates.push("name = ?");
        values.push(AppetizerData.name);
      }
      if (AppetizerData.description) {
        updates.push("description = ?");
        values.push(AppetizerData.description);
      }
      if (AppetizerData.price) {
        updates.push("price = ?");
        values.push(AppetizerData.price);
      }
      if (AppetizerData.type) {
        updates.push("type = ?");
        values.push(AppetizerData.type);
      }
      if (AppetizerData.stock) {
        updates.push("stock = ?");
        values.push(AppetizerData.stock);
      }
      if (AppetizerData.image_url) {
        updates.push("image_url = ?");
        values.push(AppetizerData.image_url);
      }
      if (updates.length === 0) {
        throw new Error("No data to update");
      }

      const query = `UPDATE product SET ${updates.join(", ")} WHERE type = 'appetizer' AND id = ?`;
      values.push(id);
      await db.execute(query, values);
    } catch (err) {
      throw err;
    }
  },

  // SQL QUERY to delete a appetizer by its ID using promise
  deleteAppetizerById: async (id) => {
    try {
      const [result] = await db.query("DELETE FROM product WHERE type = 'appetizer' AND id = ?", [id]);
      return result;
    } catch (err) {
      console.error(`Error deleting appetizer with ID ${id}:`, err);
      throw new Error("Error deleting the appetizer");
    }
  },
};

module.exports = Appetizer;
