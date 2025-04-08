const Product = require("../models/product");
const { CheckBody } = require("../modules/checkbody");

// Handle getAll Products Request
exports.getAllProduct = (req, res) => {
  Product.getAll((err, products) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res
        .status(500)
        .json({ error: "Error while fetching products data" });
    }
    res.json(products);
  });
};

// Handle GetProductById Request
exports.getProductById = (req, res) => {
  const productId = req.params.id;
  Product.getById(productId, (err, product) => {
    if (err) {
      console.error("Error fetching product by id:", err);
      return res
        .status(500)
        .json({ error: "Error while fetching this product" });
    }
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  });
};

// Handle createProduct Request
exports.createProduct = (req, res) => {
  const newProduct = req.body;
  const token = req.headers.token;

  const requiredFields = [
    "name",
    "description",
    "price",
    "type",
    "stock",
    "image_url",
  ];

  // Check if required fields are provided
  if (!CheckBody(newProduct, requiredFields)) {
    return res.status(400).json({
      result: "Cannot create a product",
      error: "Missing required fields",
    });
  }

  // Check if token is present
  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  console.log("Creating product with data:", newProduct);
  Product.createProduct(newProduct, (err, result) => {
    if (err) {
      console.error("Error creating product:", err);
      return res
        .status(500)
        .json({ error: "Error while creating the product" });
    }
    res.status(201).json({
      message: "Product successfully created",
      id: result.insertId,
    });
  });
};

// Handle deleteProduct Request
exports.deleteProductById = (req, res) => {
  const productId = req.params.id;
  const token = req.headers.token;

  // Check if token is present
  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  Product.deleteProductById(productId, (err) => {
    if (err) {
      console.error("Error deleting product:", err);
      return res
        .status(500)
        .json({ error: "Error while deleting the product" });
    }
    res.json({ message: "Product successfully deleted" });
  });
};
