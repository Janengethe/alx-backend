import redis from 'redis';

// Create a new client
const publisher = redis.createClient();
// By default, redis.createClient() will use 127.0.0.1 and 6379

// Listen for connect events
publisher.on('connect', () => {
  console.log('Redis client connected to the server');
});
// Listen for error events
publisher.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});
function publishMessage(message, time) {
  setTimeout(() => {
    console.log(`About to send ${message}`);
    publisher.publish('holberton school channel', message);
  }, time);
}

publishMessage('Holberton Student #1 starts course', 100);
publishMessage('Holberton Student #2 starts course', 200);
publishMessage('KILL_SERVER', 300);
publishMessage('Holberton Student #3 starts course', 400);
