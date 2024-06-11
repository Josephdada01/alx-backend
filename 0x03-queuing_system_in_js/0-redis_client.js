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
