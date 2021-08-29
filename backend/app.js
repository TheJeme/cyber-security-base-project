const config = require("./utils/config");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("express-async-errors");
const cors = require("cors");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

module.exports = app;
