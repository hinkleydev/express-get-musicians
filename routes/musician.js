const express = require("express");
const musicianRouter = express();
const { Musician } = require("../models/index")
const { check, validationResult } = require("express-validator");

// --- Validators ---
// These just check the strings aren't blank
checkNotBlank = () => check(["name", "instrument"]).not().isEmpty().trim().withMessage("Both name and instrument must be included");

// --- CREATE operations ---

// Add new musician
musicianRouter.post("/",
    [checkNotBlank()] // Validators
    ,async function(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json( {error: errors.array()}) ;
        return;
    }
    const name = req.body.name;
    const instrument = req.body.instrument;
    const bandId = req.body.bandId;
    await Musician.create({name, instrument, bandId}) // Shorthand object syntax
    const allMusicians = await Musician.findAll();
    res.json(allMusicians);
})

// --- READ operations ---

// Return all musicians 
musicianRouter.get("/", async function(req, res) {
    const allMusicians = await Musician.findAll();
    res.json(allMusicians);
})

// Return specific musician
musicianRouter.get("/:id", async function(req, res) {
    const musician = await Musician.findByPk(req.params.id);
    if (musician == null) { // Doesn't exist
        res.status(404).json({"message" : "Not found"})
        return;
    }
    res.json(musician);
})

// --- UPDATE operations ---

// Update specific musician
musicianRouter.put("/:id", async function(req, res) {
    const musician = await Musician.findByPk(req.params.id);
    if (musician == null) { // Doesn't exist
        res.status(404).json({"message" : "Not found"})
        return;
    }
    const name = req.body.name;
    const instrument = req.body.instrument;
    const bandId = req.body.bandId;
    await musician.update({name, instrument, bandId}) // Shorthand object
    const allMusicians = await Musician.findAll();
    res.json(allMusicians);
})

// --- DELETE operations ---

// Delete specific musician
musicianRouter.delete("/:id", async function(req, res) {
    const musician = await Musician.findByPk(req.params.id);
    if (musician == null) { // Doesn't exist
        res.status(404).json({"message" : "Not found"})
        return;
    }
    await musician.destroy();
    res.json({"message" : "Deleted"})
})

// --- END operations ---

module.exports = musicianRouter;