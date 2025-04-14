const express = require("express");
const router = express.Router();
const dessertController = require("../controllers/dessertController");

// List of all the current routes with the method in the controller file

// Product routes
router.get("/read", dessertController.getAlldessert);
router.get("/read/:id", dessertController.getdessertById);
router.post("/create", dessertController.createdessert);
router.delete("/delete/:id", dessertController.deletedessertById);

module.exports = router;
