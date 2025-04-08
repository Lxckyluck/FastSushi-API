const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./connections");
const createSecretKey = process.env.JWT_SECRET_KEY;

const User = {
  // Fonction pour récupérer tous les utilisateurs
  getAll: async () => {
    try {
      const [results] = await db.execute("SELECT * FROM users");
      return results;
    } catch (err) {
      throw err;
    }
  },

  // Fonction pour récupérer un utilisateur par son ID
  getById: async (id) => {
    try {
      const [results] = await db.execute("SELECT * FROM users WHERE id = ?", [
        id,
      ]);
      return results[0];
    } catch (err) {
      throw err;
    }
  },

  // Fonction pour créer un utilisateur
  create: async (userData) => {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const role = 1;
      const token = jwt.sign({ name: userData.name }, createSecretKey, {
        expiresIn: "24h",
      });

      const [result] = await db.execute(
        "INSERT INTO users (name, email, password, token, role) VALUES (?, ?, ?, ?, ?)",
        [userData.name, userData.email, hashedPassword, token, role]
      );

      return { insertId: result.insertId, token: token };
    } catch (err) {
      throw err;
    }
  },

  // Fonction pour connecter un utilisateur
  login: async (email, password) => {
    try {
      const [results] = await db.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      if (results.length === 0) {
        throw new Error("User not found");
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign({ name: user.name }, createSecretKey, {
        expiresIn: "24h",
      });
      await db.execute("UPDATE users SET token = ? WHERE id = ?", [
        token,
        user.id,
      ]);

      return { user, token };
    } catch (err) {
      throw err;
    }
  },

  // Fonction pour déconnecter un utilisateur
  logout: async (id) => {
    try {
      await db.execute("UPDATE users SET token = '' WHERE id = ?", [id]);
    } catch (err) {
      throw err;
    }
  },

  // Fonction pour mettre à jour un utilisateur
  update: async (id, userData) => {
    try {
      let updates = [];
      let values = [];

      if (userData.name) {
        updates.push("name = ?");
        values.push(userData.name);
      }
      if (userData.email) {
        updates.push("email = ?");
        values.push(userData.email);
      }
      if (userData.password) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        updates.push("password = ?");
        values.push(hashedPassword);
      }

      if (updates.length === 0) {
        throw new Error("No data to update");
      }

      const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
      values.push(id);

      await db.execute(query, values);
    } catch (err) {
      throw err;
    }
  },

  // Fonction pour supprimer un utilisateur
  delete: async (id) => {
    try {
      await db.execute("DELETE FROM users WHERE id = ?", [id]);
    } catch (err) {
      throw err;
    }
  },
};

module.exports = User;
