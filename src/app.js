const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

// Return all musicians 
app.get("/musicians", async function(req, res) {
    const allMusicians = await Musician.findAll();
    res.json(allMusicians);
})


module.exports = app;