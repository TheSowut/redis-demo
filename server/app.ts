// /** @type {import("express").RequestHandler} */
import express from "express";
import redis from "./redis";

const app = express();
const cors = require('cors');
const port = 8080;

app.use(cors());

app.get('/', (_, res) => {
    res.sendStatus(200);
});

app.get('/time', async (_, res) => {
    await redis.set('key', Date.now());
    const timestamp = await redis.get('key');

    res.send({
        status: 200,
        date: timestamp
    });
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));
