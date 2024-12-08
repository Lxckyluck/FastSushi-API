var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const { checkBody } = require("../modules/checkBody");
require("../models/connection");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const secretKey = process.env.SECRET_KEY;

router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["name", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne().then((data) => {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const role = 1;

    const newUser = new User({
      name: req.body.name,
      password: hash,
      token: jwt.sign(
        {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          Role: role,
        },
        secretKey,
        {
          expiresIn: "1h",
        }
      ),
      Role: role,
    });
    newUser.save().then((data) => {
      res.json({
        result: "User has been successfully created",
        name: data.name,
        password: data.password,
        token: data.token,
        Role: data.Role,
      });
    });
  });
});

router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["name", "password"])) {
    res.json({ result: "Connection failed", error: "Missing or empty fields" });
    return;
  }

  User.findOne({ name: req.body.name }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: "Connected Successfully" });
    } else {
      res.json({
        result: "Connection failed",
        error: "User not found or wrong password",
      });
    }
  });
});

module.exports = router;
