const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// List of all the current routes with the method in the controller file

// Product routes
router.get("/read", productController.getAllProduct);
router.get("/read/:id", productController.getProductById);
router.post("/createProduct", productController.createProduct);
router.post("/createOffer", productController.createOffer);
router.delete("/deleteProduct/:id", productController.deleteProductById);

module.exports = router;
