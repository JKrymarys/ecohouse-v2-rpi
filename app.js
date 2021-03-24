"use strict";
import express from 'express';

import { getCurrentHouseState } from './sensors/sensors.js'

const app = express();
const port = 5000;

app.get('/current-house-state', (req, res) => {
    res.send(getCurrentHouseState())
})

app.listen(port, () => {
    console.log(`Ecohouse data colleted listening at port ${port}`)
})