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

describe('/musicians endpoint', function() {
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
