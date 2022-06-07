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

client.hset('HolbertonSchools', 'Portland', '50', redis.print);
client.hset('HolbertonSchools', 'Seattle', '80', redis.print);
client.hset('HolbertonSchools', 'New York', '20', redis.print);
client.hset('HolbertonSchools', 'Bogota', '20', redis.print);
client.hset('HolbertonSchools', 'Cali', '40', redis.print);
client.hset('HolbertonSchools', 'Paris', '2', redis.print);

client.hgetall('HolbertonSchools', (err, result) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log(result);
});
