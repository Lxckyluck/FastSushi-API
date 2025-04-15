const appetizer = require("../models/appetizer");
const { CheckBody } = require("../modules/checkbody");

exports.getAllAppetizer = async (req, res) => {
  try {
    const appetizers = await appetizer.getAppetizer();
    res.json(appetizers);
  } catch (err) {
    res.status(500).json({ error: "Error while fetching appetizers data" });
  }
};

exports.getAppetizerById = async (req, res) => {
  const appetizerId = req.params.id;
  try {
    const appetizerDetails = await appetizer.getAppetizerById(appetizerId);
    res.json(appetizerDetails);
  } catch (err) {
    res.status(500).json({ error: "Error while fetching this appetizer" });
  }
};

exports.createAppetizer = async (req, res) => {
  const newAppetizer = req.body;
  const token = req.headers.token;

  const requiredFields = [
    "name",
    "description",
    "price",
    "stock",
    "image_url",
  ];

  if (!CheckBody(newAppetizer, requiredFields)) {
    return res.status(400).json({
      result: "Cannot create an Appetizer",
      error: "Missing required fields",
    });
  }

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const insertId = await appetizer.createAppetizer(newAppetizer);
    res.status(201).json({
      message: "Appetizer successfully created",
      id: insertId,
    });
  } catch (err) {
    res.status(500).json({ error: "Error while creating the appetizer" });
  }
};

exports.updateAppetizerById = async (req, res) => {
  const appetizerId = req.params.id;
  const updatedAppetizer = req.body;
  try {
    await appetizer.updateAppetizer(appetizerId, updatedAppetizer);
    res.status(200).json({
      message: "Appetizer successfully updated",
      Informations: updatedAppetizer,
    });
  } catch (err) {
    res.status(500).json({ error: "Error while updating the appetizer" });
  }
};

exports.deleteAppetizerById = async (req, res) => {
  const appetizerId = req.params.id;
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    await appetizer.deleteAppetizerById(appetizerId);
    res.json({ message: "Appetizer successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error while deleting the appetizer" });
  }
};
