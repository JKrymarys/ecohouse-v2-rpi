import express from 'express';
import cors from 'cors';

import { getCurrentHouseState } from './sensors'

const app = express();
const port = 5000;

app.get('/get_temp_state', cors() as any, (req, res) => {
    res.send(getCurrentHouseState())
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })