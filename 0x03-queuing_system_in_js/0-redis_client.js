// Using Babel and ES6, write a script named 0-redis_client.js.
// It should connect to the Redis server running on your machine:
import { createClient } from "redis";

const client = createClient();

client.on('connect', () => {
    console.log('Redis client connected to the server');
});

client.on('error', (err) => {
    console.error(`Redis client not connected to the server: ${err.message}`);
});

(async () => {
    try {
        await client.connect();
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
})();
