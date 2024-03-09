const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const path = require("path");
// const axios = require('axios')
require("dotenv").config();

require("./src/db/mongoose");

const user = require("./src/routes/user");
const restaurant = require("./src/routes/restaurant");
const adminDashboard = require("./src/routes/adminDashboard");
const menu = require("./src/routes/menu");
const order = require("./src/routes/placeOrder");
const { connectDB } = require("./src/db/mongoose");
// connectDB()
app.use(cors());
let db_url = process.env.CUSTOMCONNSTR_DB_TEST;
connectDB(db_url);
// app.use(express.json());
app.use(bodyParser.json());
// app.use('/', express.static(path.join())) //used in-case of single app, angular is folder which contains UI build

app.use("/user", user);

app.use("/dashboard", adminDashboard);
app.use("/order", order);
app.use("/restaurant", restaurant);
app.use("/menu", menu);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS",
  );
  next();
});

app.get("/", (req, res, next) => {
  res.send("Welcome to Kuponz Backend!");
});
//For all requests other than the mentioned ones:
app.use((req, res, next) => {
  res.send("Please Check Your route. It Seems Broken Like Owner's Heart 🤣");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));

module.exports = app;
