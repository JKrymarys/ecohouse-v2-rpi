import express from 'express';
import cors from 'cors';

import { getCurrentHouseState } from './sensors'

const app = express();
const port = 5000;

app.get('/current-house-state', cors() as any, (req, res) => {
    res.send(getCurrentHouseState())
})

app.listen(port, () => {
    console.log(`Ecohouse data colleted listening at port ${port}`)
})