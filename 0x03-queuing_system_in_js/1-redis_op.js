import { createClient } from "redis";

// Create a Redis client
const client = createClient();

// Event handlers
client.on('connect', () => {
    console.log('Redis client connected to the server');
});

client.on('error', (err) => {
    console.error(`Redis client not connected to the server: ${err.message}`);
});

// Connect to the Redis server
client.connect().catch(err => {
    console.error(`Error: ${err.message}`);
});

// Function to set a new school in Redis using callbacks
const setNewSchool = (schoolName, value) => {
    client.set(schoolName, value, (err, reply) => {
        if (err) {
            console.error(`Error setting value: ${err.message}`);
        } else {
            console.log(`Set key ${schoolName}: ${reply}`);
        }
    });
};

// Function to display the value of a school from Redis using callbacks
const displaySchoolValue = (schoolName) => {
    client.get(schoolName, (err, value) => {
        if (err) {
            console.error(`Error getting value: ${err.message}`);
        } else {
            console.log(`Value for ${schoolName}: ${value}`);
        }
    });
};
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
