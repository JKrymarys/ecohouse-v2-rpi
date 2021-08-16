import express from 'express';
import cors from 'cors';
import ngrok from 'ngrok';
import dotenv from 'dotenv';

dotenv.config();


import { getCurrentHouseState } from './sensors'

const app = express();
const port = 5000;

(async function () {
    const url = await ngrok.connect({
        authtoken: process.env.AUTH_TOKEN,
        addr: 5000
    });
})();


app.get('/get_temp_state', cors() as any, (req, res) => {
    res.send(getCurrentHouseState())
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})