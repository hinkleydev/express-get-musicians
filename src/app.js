const express = require("express");
const app = express();
const { Musician } = require("../models/index")

// Body processing middleware
app.use(express.urlencoded());
app.use(express.json());

// --- CREATE operations ---

// Add new musician
app.post("/musicians", async function(req, res) {
    const name = req.body.name;
    const instrument = req.body.instrument;
    const bandId = req.body.bandId;
    await Musician.create({name, instrument, bandId}) // Shorthand object syntax
    const allMusicians = await Musician.findAll();
    res.json(allMusicians);
})

// --- READ operations ---

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

// --- UPDATE operations ---

// Update specific musician
app.put("/musicians/:id", async function(req, res) {
    const musician = await Musician.findByPk(req.params.id);
    const name = req.body.name;
    const instrument = req.body.instrument;
    const bandId = req.body.bandId;
    await musician.update({name, instrument, bandId}) // Shorthand object
    const allMusicians = await Musician.findAll();
    res.json(allMusicians);
})

// --- DELETE operations ---

// Delete specific musician
app.delete("/musicians/:id", async function(req, res) {
    const musician = await Musician.findByPk(req.params.id);
    await musician.destroy();
    res.json({"message" : "Deleted"})
})

// -- END operations ---

module.exports = app;