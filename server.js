const express = require("express");
require("express-async-errors");
const cors = require("cors");
const error = require("./middlewares/error");
const routes = require("./routes/routes");
const { DB } = require("./database");
const Broker = require("./services/broker/broker");

module.exports = async (app) => {
  await DB.connect();
  await Broker.connect();

  app.use(express.json());
  app.use(cors());
  app.use(routes);
  app.use(error);
};
