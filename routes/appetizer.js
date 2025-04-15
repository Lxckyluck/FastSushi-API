const express = require("express");
const router = express.Router();
const appetizerController = require("../controllers/appetizerController");

// List of all the current routes with the method in the controller file

// Product routes
router.get("/read", appetizerController.getAllAppetizer);
router.get("/read/:id", appetizerController.getAppetizerById);
router.post("/create", appetizerController.createAppetizer);
router.put("/update/:id", appetizerController.updateAppetizerById)
router.delete("/delete/:id", appetizerController.deleteAppetizerById);

module.exports = router;
