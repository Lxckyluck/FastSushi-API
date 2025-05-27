const product = require("../models/product");
const { CheckBody } = require("../modules/checkbody");

exports.getAllProduct = async (req, res) => {
  try {
    const products = await product.getAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Error while fetching products data" });
  }
};

exports.getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const productDetails = await product.getById(productId);
    res.json(productDetails);
  } catch (err) {
    res.status(500).json({ error: "Error while fetching this product" });
  }
};

exports.createProduct = async (req, res) => {
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

  try {
    const insertId = await product.createProduct(newProduct);
    res.status(201).json({
      message: "Product successfully created",
      id: insertId,
    });
  } catch (err) {
    res.status(500).json({ error: "Error while creating the product" });
  }
};

exports.createOffer = async (req, res) => {
  const newProduct = req.body;
  const token = req.headers.token;
  const productId = req.params.id;

  const requiredFields = ["offer"];
  if (!CheckBody(newProduct, requiredFields)) {
    return res.status(400).json({
      result: "Cannot add an offer",
      error: "Missing required fields",
    });
  }

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const insertId = await product.createProduct(newProduct);
    res.status(201).json({
      message: "Offer successfully created",
      id: insertId,
    });
  } catch (err) {
    res.status(500).json({ error: "Error while creating the product" });
  }
};

exports.deleteProductById = async (req, res) => {
  const productId = req.params.id;
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    await product.deleteProductById(productId);
    res.json({ message: "Product successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error while deleting the product" });
  }
};
