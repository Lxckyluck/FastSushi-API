const product = require("../models/product");
const { CheckBody } = require("../modules/checkbody");

exports.getAllProduct = (req, res) => {
  product.getAll((err, product) => {
    if (err) {
      res.status(500).json({ error: "Error while fetching products data" });
      return;
    }
    res.json(product);
  });
};

exports.getProductById = (req, res) => {
  const productId = req.params.id;
  product.getById(productId, (err, product) => {
    if (err) {
      res.status(500).json({ error: "Error while fetching this product" });
      return;
    }
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json(product);
  });
};

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

  if (!CheckBody(newProduct, requiredFields)) {
    return res.status(400).json({
      result: "Cannot create a product",
      error: "Missing required fields",
    });
  }

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  console.log("Creating product with data:", newProduct);
  product.createProduct(newProduct, (err, insertId) => {
    if (err) {
      console.error("Error creating product:", err);
      res.status(500).json({ error: "Error while creating the product" });
      return;
    }
    res
      .status(201)
      .json({ message: "Product successfully created", id: insertId });
  });
};

exports.deleteProductById = (req, res) => {
  const productId = req.params.id;
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  product.deleteProductById(productId, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error while deleting the product" });
    }
    res.json({ message: "Product successfully deleted" });
  });
};
