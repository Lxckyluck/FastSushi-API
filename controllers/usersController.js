const User = require("../models/users");
const { CheckBody } = require("../modules/checkbody");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error while fetching users data" });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  if (req.user.id !== parseInt(userId)) {
    return res.status(403).json({ error: "Access denied" });
  }

  try {
    const user = await User.getById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error while fetching this user" });
  }
};


exports.createUser = async (req, res) => {
  const newUser = req.body;
  const requiredFields = ["name", "email", "password"];

  if (!CheckBody(newUser, requiredFields)) {
    return res.status(400).json({
      result: "Cannot create a user",
      error: "Missing required fields",
    });
  }

  console.log("Creating user with data:", newUser);
  try {
    const insertId = await User.create(newUser);
    res.status(201).json({
      message: "User successfully created",
      role: 1,
      name: newUser.name,
      id: insertId.insertId,
      token: insertId.token,
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Error while creating the user" });
  }
};

exports.logUser = async (req, res) => {
  const { email, password } = req.body;
  const requiredFields = ["email", "password"];

  if (!CheckBody(req.body, requiredFields)) {
    return res.status(400).json({
      result: "Cannot log in user",
      error: "Missing required fields",
    });
  }

  try {
    const Credentialuser = await User.login(email, password);
    res.status(200).json({
      message: "User successfully logged in",
      role: 1,
      id: Credentialuser.user.id,
      name: Credentialuser.user.name,
      token: Credentialuser.token,
    });
  } catch (err) {
    console.error("Error while logging in the user:", err);
    res.status(500).json({ error: "Error while logging in the user" });
  }
};

exports.logoutUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await User.logout(userId);
    res.json({ message: "User successfully disconnected" });
  } catch (err) {
    res.status(500).json({ error: "Error while deleting the user's token" });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  try {
    await User.update(userId, updatedUser);
    res.status(200).json({
      message: "User successfully updated",
      Informations: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ error: "Error while updating the user" });
  }
};

exports.deleteUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    await User.delete(userId);
    res.json({ message: "User successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error while deleting the user" });
  }
};
