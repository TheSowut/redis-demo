// /** @type {import("express").RequestHandler} */
import express from "express";

const app = express();
const path = require('path');
const port = 8080;

app.get('/', (_, res) => {
    res.sendStatus(200);
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));