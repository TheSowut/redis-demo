import Redis from 'ioredis';

// Sample redis client
const redis = new Redis({
    host: '127.0.0.1',
    port: 6379,
});

export default redis;
