const redis = require('redis');
// Create a new client
const client = redis.createClient();
// By default, redis.createClient() will use 127.0.0.1 and 6379

// Listen for connect events
client.on('connect', () => {
  console.log('Redis client connected to the server');
});
// Listen for error events
client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});
