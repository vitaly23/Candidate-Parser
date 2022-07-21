const axios = require('axios');
const data_parser = require('../dataParser.js');
const express = require('express');
const app = express();

const DATA_URL = "https://hs-resume-data.herokuapp.com/v3/candidates/all_data_b1f6-acde48001122";


app.get("/api/analyze_candidates", async (request, response) => {
    try {
        const internal_req = await axios.get(DATA_URL);
        const data = internal_req.data;
        const result = await data_parser.exportData(data);
        response.send(result);
    } catch (error) {
        // Normally I would send it to a logger
        console.log(error);
    }

});

app.listen( 8080, () =>
    console.log(`Backend is running! http://localhost:8080`)
);

