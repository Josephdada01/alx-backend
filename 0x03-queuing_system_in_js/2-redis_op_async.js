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

/* functions: setNewSchool: It accepts two arguments schoolName, and value.
It should set in Redis the value for the key schoolName
 It should display a confirmation message using redis.print
const setNewSchool = async (schoolName, value) => {
    try {
        await client.set(schoolName, value, (err, reply) => {
            if (err) {
                console.error(`Error setting value: ${err.message}`);
            } else {
                console.log(`Set key ${schoolName}: ${reply}`);
            }
        })
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
};
*/
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
// displaySchoolValue:
// It accepts one argument schoolName.
// It should log to the console the value for the key passed as argument
const displaySchoolValue = async (schoolName) => {
    try {
        const value = await client.get(schoolName);
        console.log(`Value for ${schoolName}: ${value}`);
    } catch (err) {
        console.error(`Error getting value: ${err.message}`);
    }
};

// calling the function for usage

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
