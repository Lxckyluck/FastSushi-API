const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: String,
  password: String,
  token: String,
  Role: Number,
});

const user = mongoose.model("users", usersSchema);

module.exports = user;
