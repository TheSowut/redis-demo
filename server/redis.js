"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ioredis_1 = require("ioredis");
// Sample redis client
var redis = new ioredis_1.default({
    host: '127.0.0.1',
    port: 6379,
});
exports.default = redis;
