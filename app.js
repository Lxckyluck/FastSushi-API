const express = require("express");
const port = 3000;
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/product");
const appetizerRouter = require("./routes/appetizer")
const plateRouter = require("./routes/plate")
const dessertRouter = require("./routes/dessert")

const app = express();
const cors = require("cors");
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/product", productsRouter);
app.use("/appetizer", appetizerRouter);
app.use("/plate", plateRouter);
app.use("/dessert", dessertRouter);

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});

module.exports = app;
