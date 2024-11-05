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

// Return specific musician
app.get("/musicians/:id", async function(req, res) {
    const musician = await Musician.findByPk(req.params.id);
    res.json(musician);
})


module.exports = app;