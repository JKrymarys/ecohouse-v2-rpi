"use strict";
import express from 'express';
import cors from 'cors';

import { getCurrentHouseState } from './sensors/sensors.js'

import { pushNewBedroomData } from './cloud.js'

const app = express();
const port = 5000;

app.get('/current-house-state', cors(), (req, res) => {
    res.send(getCurrentHouseState())
})

app.listen(port, () => {
    console.log(`Ecohouse data colleted listening at port ${port}`)
})


app.get('/push-data', cors(), (req, res) => {
    // res.send(getCurrentHouseState())
    const houseState = getCurrentHouseState();
    console.log("publishing to cloud", houseState)
    pushNewBedroomData(houseState);
    res.send("ok");
})