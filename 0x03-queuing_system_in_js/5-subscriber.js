import redis from 'redis';

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

client.subscribe('holberton school channel');

client.on('message', (channel, message) => {
  if (channel === 'holberton school channel') console.log(message);
  if (message === 'KILL_SERVER') {
    client.unsubscribe();
    client.quit();
  }
});
