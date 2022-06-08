import { promisify } from 'util';
import { createClient, print } from 'redis';

const client = createClient();

const asyncGet = promisify(client.get).bind(client);

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print);
}

async function displaySchoolValue(schoolName) {
  console.log(await asyncGet(schoolName));
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
