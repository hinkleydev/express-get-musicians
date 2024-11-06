const { musicianRouter } = require("../routes/index");

const express = require("express");
const app = express();

app.use("/musicians", musicianRouter)

module.exports = app;