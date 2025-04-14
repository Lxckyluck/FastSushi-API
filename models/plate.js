const db = require("./connections");

const plate = {
  // SQL QUERY to get all plates using promise
  getplate: async () => {
    try {
      const [results] = await db.query("SELECT * FROM product where type = 'plate'");
      return results;
    } catch (err) {
      console.error("Error fetching all plate:", err);
      throw new Error("Error fetching all plate");
    }
  },

  // SQL QUERY to get a plate by its ID using promise
  getplateById: async (id) => {
    try {
      const [results] = await db.query("SELECT * FROM product WHERE type = 'plate' AND id = ?", [
        id,
      ]);
      if (results.length === 0) {
        throw new Error("plate not found");
      }
      return results[0];
    } catch (err) {
      console.error(`Error fetching plate with ID ${id}:`, err);
      throw new Error("Error fetching plate");
    }
  },

  // SQL QUERY to create a new plate using promise
  createplate: async (plateData) => {
    const { name, description, price, stock, image_url } = plateData;
    try {
      const [result] = await db.query(
        "INSERT INTO product (name, description, price, type, stock, image_url) VALUES (?, ?, ?, 'plate', ?, ?)",
        [name, description, price, stock, image_url]
      );
      return result.insertId;
    } catch (err) {
      console.error("Error creating plate:", err);
      throw new Error("Error while creating the plate");
    }
  },

  // SQL QUERY to delete a plate by its ID using promise
  deleteplateById: async (id) => {
    try {
      const [result] = await db.query("DELETE FROM product WHERE type = 'plate' AND id = ?", [id]);
      return result;
    } catch (err) {
      console.error(`Error deleting plate with ID ${id}:`, err);
      throw new Error("Error deleting the plate");
    }
  },
};

module.exports = plate;
