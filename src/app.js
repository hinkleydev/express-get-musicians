const { musicianRouter } = require("../routes/index");

const express = require("express");
const app = express();

// Body processing middleware
app.use(express.urlencoded());
app.use(express.json());

app.use("/musicians", musicianRouter)

module.exports = app;