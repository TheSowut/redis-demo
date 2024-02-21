import express from "express";
import redis from "./redis";

const app = express();
const cors = require('cors');
const port = 8080;

app.use(cors());
app.use(express.json());

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

app.post('/parameter/:id', async (req, res) => {
    const id: string = req.params.id;
    const payload = req.body.data;

    await redis.set(id, payload);
    res.send({
        status: 200,
        data: payload
    });
});

app.delete('/parameter/:id', async (req, res) => {
    const id: string = req.params.id;
    const value = await redis.get(id);

    if (!value) {
        res.sendStatus(404);
        return;
    }

    redis.del(id);
    res.send({
        status: 200,
        data: id
    });
})

app.listen(port, () => console.log(`Listening on localhost:${port}`));
