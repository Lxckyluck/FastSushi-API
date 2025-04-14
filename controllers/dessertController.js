const dessert = require("../models/dessert");
const { CheckBody } = require("../modules/checkbody");

exports.getAlldessert = async (req, res) => {
  try {
    const desserts = await dessert.getdessert();
    res.json(desserts);
  } catch (err) {
    res.status(500).json({ error: "Error while fetching desserts data" });
  }
};

exports.getdessertById = async (req, res) => {
  const dessertId = req.params.id;
  try {
    const dessertDetails = await dessert.getdessertById(dessertId);
    res.json(dessertDetails);
  } catch (err) {
    res.status(500).json({ error: "Error while fetching this dessert" });
  }
};

exports.createdessert = async (req, res) => {
  const newdessert = req.body;
  const token = req.headers.token;

  const requiredFields = [
    "name",
    "description",
    "price",
    "stock",
    "image_url",
  ];

  if (!CheckBody(newdessert, requiredFields)) {
    return res.status(400).json({
      result: "Cannot create an dessert",
      error: "Missing required fields",
    });
  }

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const insertId = await dessert.createdessert(newdessert);
    res.status(201).json({
      message: "dessert successfully created",
      id: insertId,
    });
  } catch (err) {
    res.status(500).json({ error: "Error while creating the dessert" });
  }
};

exports.deletedessertById = async (req, res) => {
  const dessertId = req.params.id;
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    await dessert.deletedessertById(dessertId);
    res.json({ message: "dessert successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error while deleting the dessert" });
  }
};
