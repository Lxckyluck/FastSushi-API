const db = require("./connections");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createSecretKey = process.env.JWT_SECRET_KEY;

// Defined User models for the users table
const User = {
  // SQL QUERY for GetAllUsers from the users table
  getAll: (callback) => {
    db.query("SELECT * FROM users", (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  },

  // SQL QUERY for GetUsersById in the user's table
  getById: (id, callback) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results[0]);
    });
  },

  // SQL QUERY for create an user in the user's table
  create: (userData, callback) => {
    // Hashing password using bcrypt
    bcrypt.hash(userData.password, 10, (err, hash) => {
      if (err) {
        callback(err, null);
        return;
      }
      const role = 1;
      const token = jwt.sign(
        { name: userData.name, role: role },
        createSecretKey,
        { expiresIn: "24h" }
      );
      db.query(
        "INSERT INTO users (name, email, password, token) VALUES (?, ?, ?, ?)",
        [userData.name, userData.email, hash, token],
        (err, result) => {
          if (err) {
            callback(err, null);
            return;
          }
          callback(null, { insertId: result.insertId, token: token });
        }
      );
    });
  },

  // SQL QUERY for log a user
  login: (email, password, callback) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (results.length === 0) {
        callback(new Error("User not found"), null);
        return;
      }

      const user = results[0];

      // Compared hashed password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          callback(err, null);
          return;
        }
        if (!isMatch) {
          callback(new Error("Invalid password"), null);
          return;
        }

        // Generate a new JWT Token
        const token = jwt.sign(
          { id: user.id, name: user.name, role: user.role },
          createSecretKey,
          { expiresIn: "24h" }
        );

        // Update the user with the new token
        db.query(
          "UPDATE users SET token = ? WHERE id = ?",
          [token, user.id],
          (err, updateResult) => {
            if (err) {
              callback(err, null);
              return;
            }
            callback(null, { user, token });
          }
        );
      });
    });
  },

  logout: (id, callback) => {
    db.query(
      "UPDATE users SET token = '' WHERE id = ?",
      [id],
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, result);
      }
    );
  },

  // SQL QUERY for update name, email, password of the users using the id
  update: (id, userData, callback) => {
    bcrypt.hash(userData.password, 10, (err, hash) => {
      if (err) {
        callback(err, null);
        return;
      }
      db.query(
        "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
        [userData.name, userData.email, hash, id],
        (err, result) => {
          if (err) {
            callback(err, null);
            return;
          }
          callback(null, result);
        }
      );
    });
  },

  // SQL QUERY for delete an users using his id
  delete: (id, callback) => {
    db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    });
  },
};

module.exports = User;
