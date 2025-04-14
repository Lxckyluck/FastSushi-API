const plate = require("../models/plate");
const { CheckBody } = require("../modules/checkbody");

exports.getAllplate = async (req, res) => {
  try {
    const plates = await plate.getplate();
    res.json(plates);
  } catch (err) {
    res.status(500).json({ error: "Error while fetching plates data" });
  }
};

exports.getplateById = async (req, res) => {
  const plateId = req.params.id;
  try {
    const plateDetails = await plate.getplateById(plateId);
    res.json(plateDetails);
  } catch (err) {
    res.status(500).json({ error: "Error while fetching this plate" });
  }
};

exports.createplate = async (req, res) => {
  const newplate = req.body;
  const token = req.headers.token;

  const requiredFields = [
    "name",
    "description",
    "price",
    "stock",
    "image_url",
  ];

  if (!CheckBody(newplate, requiredFields)) {
    return res.status(400).json({
      result: "Cannot create an plate",
      error: "Missing required fields",
    });
  }

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const insertId = await plate.createplate(newplate);
    res.status(201).json({
      message: "plate successfully created",
      id: insertId,
    });
  } catch (err) {
    res.status(500).json({ error: "Error while creating the plate" });
  }
};

exports.deleteplateById = async (req, res) => {
  const plateId = req.params.id;
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    await plate.deleteplateById(plateId);
    res.json({ message: "plate successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error while deleting the plate" });
  }
};
