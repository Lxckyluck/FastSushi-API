var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const { checkBody } = require("../modules/checkBody");
require("../models/connection");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const secretKey = process.env.SECRET_KEY;

router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["firstname", "lastname", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne().then((data) => {
    const hash = bcrypt.hashSync(req.body.password, 10);

    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: hash,
      token: jwt.sign({ username: req.body.username }, secretKey, {
        expiresIn: "1h",
      }),
    });
    newUser.save().then((data) => {
      res.json({
        result: "User has been successfully created",
        firstname: data.firstname,
        username: data.username,
        password: data.password,
        token: data.token,
      });
    });
  });
});

module.exports = router;
