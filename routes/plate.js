const express = require("express");
const router = express.Router();
const plateController = require("../controllers/plateController");

// List of all the current routes with the method in the controller file

// Product routes
router.get("/read", plateController.getAllplate);
router.get("/read/:id", plateController.getplateById);
router.post("/create", plateController.createplate);
router.put("/update/:id", plateController.updateplateById)
router.delete("/delete/:id", plateController.deleteplateById);

module.exports = router;
