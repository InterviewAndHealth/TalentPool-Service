const express = require("express");
require("express-async-errors");
const cors = require("cors");
const error = require("./middlewares/error");
const routes = require("./routes/routes");
const { DB } = require("./database");
const Broker = require("./services/broker/broker");
const { TalentPoolService } = require("./services/rpcandeventservice");
const RPCService = require("./services/broker/rpc");
const EventService = require("./services/broker/events");
const { SERVICE_QUEUE } = require("./config/index");

module.exports = async (app) => {
  await DB.connect();
  await Broker.connect();

  app.use(express.json());
  app.use(cors());
  app.use(routes);
  app.use(error);



  const talentpoolservice = new TalentPoolService();
  await Broker.connect();
  await RPCService.respond(talentpoolservice);
  await EventService.subscribe(SERVICE_QUEUE, talentpoolservice);
};
