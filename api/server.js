const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const authenticate = require("../auth/authenticate-middleware.js");
const knexSessionStore = require("connect-session-knex")(session);

const authRouter = require("../auth/auth-router.js");
const jokesRouter = require("../jokes/jokes-router.js");

const server = express();

const sessionConfig = {
  name: "chocolate-chip",
  secret: "mysecret",
  cookie: {
    maxAge: 3600 * 1000,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,

  store: new knexSessionStore({
    knex: require("../database/dbconfig.js"),
    tableName: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 3600 * 1000,
  }),
};

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(session(sessionConfig));

server.use("/api/auth", authRouter);
server.use("/api/jokes", authenticate, jokesRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
