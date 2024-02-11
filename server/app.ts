// /** @type {import("express").RequestHandler} */
import express from "express";
import redis from "./redis";

const app = express();
const cors = require('cors');
const port = 8080;

app.use(cors());
redis.set('time', Date.now());

app.get('/', (_, res) => {
    res.sendStatus(200);
});

app.get('/parameter/:id', async (req, res) => {
    const id: string = req.params.id;
    const data = await redis.get(id);

    if (!data) {
        res.sendStatus(404);
        return;
    }

    res.send({
        status: 200,
        data
    });
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));
