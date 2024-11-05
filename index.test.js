// install dependencies
const { execSync } = require('child_process');
//execSync('npm install'); // Don't really need this
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");
const { expect, it, describe } = require("@jest/globals");

// --- CREATE operations ---

describe("POST /muscians endpoint", function() {
    const url = "/musicians";
    it("returns 200 code", async function() {
        const response = await request(app)
        .post(url)
        .send({name: "Jay Kay", instrument: "Voice", bandId: null});
        expect(response.statusCode).toBe(200);
    })
    it("returns all musicians with new musician", async function() {
        const response = await request(app)
        .post(url)
        .send({name: "Billie Joe Armstrong", instrument: "Guitar", bandId: null});
        const parsed = JSON.parse(response.text);
        const original = Musician.findAll();
        for(let index in original.length) {
            expect(parsed[index].name).toBe(original[index].name);
            expect(parsed[index].instrument).toBe(original[index].instrument)
            expect(parsed[index].bandId).toBe(original[index].bandId)
        }
    })
})

// --- READ operations ---

describe("GET /musicians endpoint", function() {
    const url = "/musicians";
    it("returns 200 code", async function() {
        const response = await request(app).get(url);
        expect(response.statusCode).toBe(200);
    })
    it("returns the correct data", async function(){
        const response = await request(app).get(url);
        const parsed = JSON.parse(response.text);
        const original = await Musician.findAll();
        for(let index in original.length) {
            expect(parsed[index].name).toBe(original[index].name);
            expect(parsed[index].instrument).toBe(original[index].instrument)
            expect(parsed[index].bandId).toBe(original[index].bandId)
        }
    })
})

describe("GET /musicians/:id endpoint", function() {
    const url = "/musicians/1";
    it("returns 200 code", async function() {
        const response = await request(app).get(url);
        expect(response.statusCode).toBe(200);
    })
    it("returns the correct data", async function() {
        const response = await request(app).get(url);
        const parsed = JSON.parse(response.text);
        const original = await Musician.findByPk(1);
        expect(parsed.name).toBe(original.name);
        expect(parsed.instrument).toBe(parsed.instrument);
        expect(parsed.bandId).toBe(original.bandId);
    })
    it("returns 404 on a musician that doesn't exist", async function() {
        const response = await request(app).get(url + "999");
        expect(response.statusCode).toBe(404);
    })
})

// --- UPDATE operations ---

describe("PUT /musicians/:id endpoint", function() {
    const url = "/musicians/";
    it("returns 200 code", async function() {
        const response = await request(app)
        .put(url + "1")
        .send({name: "Gerard Way", instrument: "Voice", bandId: null});
        expect(response.statusCode).toBe(200);
    })
    it("returns all musicians updated", async function() {
        const response = await request(app)
        .put(url + "1")
        .send({name: "Hudson Mohawke", instrument: "Synth", bandId: null});
        expect(response.statusCode).toBe(200);
        const parsed = JSON.parse(response.text);
        const original = await Musician.findAll();
        for(let index in original.length) {
            expect(parsed[index].name).toBe(original[index].name);
            expect(parsed[index].instrument).toBe(original[index].instrument)
            expect(parsed[index].bandId).toBe(original[index].bandId)
        }
    })
    it("returns 404 on a musician that doesn't exist", async function() {
        const response = await request(app)
        .put(url + "999")
        .send({name: "Another one", instrument: "Voice", bandId: null});
        expect(response.statusCode).toBe(404);
    })
})

// --- DELETE operations ---
