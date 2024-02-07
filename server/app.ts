// /** @type {import("express").RequestHandler} */
import express from "express";
import redis from "./redis";

const app = express();
const port = 8080;

app.get('/', (_, res) => {
    res.sendStatus(200);
});

app.get('/test', async (_, res) => {
    await redis.set('key', Date.now());
    const a = await redis.get('key');

    res.send({
        status: 200,
        date: a
    });
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));
