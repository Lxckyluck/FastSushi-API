const mysql = require("mysql2");
const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const port = process.env.PORT;

const connection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
  port: port,
});

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    return;
  }
  console.log("Connecté à la base de données MariaDB avec succès !");

  const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      token VARCHAR(512) NOT NULL,
      role INT NOT NULL
    )
  `;
  connection.query(createUserTableQuery, (err) => {
    if (err) {
      console.error("Erreur lors de la création de la table users :", err);
      return;
    }
    console.log("Table users vérifiée/créée avec succès !");
  });

  const createProductTableQuery = `
    CREATE TABLE IF NOT EXISTS product (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price DECIMAL(8, 2) NOT NULL,
      type ENUM('appetizer', 'plate', 'dessert') NOT NULL,
      stock INT DEFAULT 0,
      image_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
  `;
  connection.query(createProductTableQuery, (err) => {
    if (err) {
      console.error("Erreur lors de la création de la table Product :", err);
      return;
    }
    console.log("Table product vérifiée/créée avec succès !");
  });
});

module.exports = connection;
