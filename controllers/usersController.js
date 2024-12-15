const User = require("../models/users");
const { CheckBody } = require("../modules/checkbody");

// Handle getAll Users Request
exports.getAllUsers = (req, res) => {
  User.getAll((err, users) => {
    if (err) {
      res.status(500).json({ error: "Error while fetching users data" });
      return;
    }
    res.json(users);
  });
};

// Handle GetUsersById Request
exports.getUserById = (req, res) => {
  const userId = req.params.id;
  User.getById(userId, (err, user) => {
    if (err) {
      res.status(500).json({ error: "Error while fetching this user" });
      return;
    }
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  });
};

// Handle createUser Request
exports.createUser = (req, res) => {
  const newUser = req.body;
  const requiredFields = ["name", "email", "password"];

  if (!CheckBody(newUser, requiredFields)) {
    return res.status(400).json({
      result: "Cannot create a user",
      error: "Missing required fields",
    });
  }

  console.log("Creating user with data:", newUser);
  User.create(newUser, (err, insertId) => {
    if (err) {
      console.error("Error creating user:", err);
      res.status(500).json({ error: "Error while creating the user" });
      return;
    }
    res
      .status(201)
      .json({ message: "Utilisateur successfully created", id: insertId });
  });
};

// Handle LoginUser Request
exports.logUser = (req, res) => {
  const requiredFields = ["email", "password"];

  if (!CheckBody(req.body, requiredFields)) {
    return res.status(400).json({
      result: "Cannot log in user",
      error: "Missing required fields",
    });
  }

  const { email, password } = req.body;

  User.login(email, password, (err, Credentialuser) => {
    if (err) {
      console.error("Error while logging in the user:", err);
      res.status(500).json({ error: "Error while logging in the user" });
      return;
    }
    if (!Credentialuser) {
      res.status(404).json({ error: "Wrong credentials" });
      return;
    }
    res.status(200).json({
      message: "User successfully logged in",
      user: Credentialuser.user,
      token: Credentialuser.token,
    });
  });
};

// Handle updateUser Request
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  User.update(userId, updatedUser, (err) => {
    if (err) {
      res.status(500).json({ error: "Error while updating the user" });
      return;
    }
    res.json({ message: "User successfully updated" });
  });
};

exports.updateUserRoleById = (req, res) => {
  const userId = req.params.id;
  const updatedUserRoleById = req.body;
  User.update(userId, updatedUserRoleById, (err) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Error while updating the roles of the user" });
    }
    res.json({ message: "User Roles Successfully updated" });
  });
};

// Handle deleteUser Request
exports.deleteUserById = (req, res) => {
  const userId = req.params.id;
  User.delete(userId, (err) => {
    if (err) {
      res.status(500).json({ error: "Error while deleting the user" });
      return;
    }
    res.json({ message: "User successfully deleted" });
  });
};
