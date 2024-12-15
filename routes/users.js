const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

// List of all the current routes with the method in the controller file
router.get("/read", userController.getAllUsers);
router.get("/read/:id", userController.getUserById);
router.post("/signup", userController.createUser);
router.post("/signin", userController.logUser);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUserById);

module.exports = router;
