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

// setNewSchool sets in Redis the value for the key schoolName
// It displays a confirmation message using redis.print
function setNewSchool(schoolName, value){
    client.set(schoolName, value, redis.print);
}

// displaySchoolValue
function displaySchoolValue(schoolName){
    client.get(schoolName, function(err, result) {
	if (err){
	    console.log(err);
	    throw err;
	}
	console.log(result);
    });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
