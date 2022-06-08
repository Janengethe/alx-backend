import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';

// Data
const listProducts = [
  {
    itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4,
  },
  {
    itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10,
  },
  {
    itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2,
  },
  {
    itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5,
  },
];

// Data access
function getItemById(id) {
  return listProducts.filter((item) => item.itemId === id)[0];
}

// client to connect on redis server
const client = createClient();
const getAsync = promisify(client.get).bind(client);

client.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error.message}`);
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// set in Redis the stock for the key item.ITEM_ID
function reserveStockById(itemId, stock) {
  client.set(`item.${itemId}`, stock);
}

// return the reserved stock for a specific item
async function getCurrentReservedStockById(itemId) {
  const stock = await getAsync(`item.${itemId}`);
  return stock;
}

// Express Server
const app = express();
const port = 1245;

const notFound = { status: 'Product not found' };

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

// Returns the list of every available product
app.get('/list_products', (req, res) => {
  res.json(listProducts);
});

// return the current product and the current available stock
app.get('/list_products/:itemId', async (req, res) => {
  const itemId = Number(req.params.itemId);
  const item = getItemById(itemId);

  if (!item) {
    res.json(notFound);
    return;
  }

  const currentStock = await getCurrentReservedStockById(itemId);
  if (!currentStock) {
    await reserveStockById(itemId, item.initialAvailableQuantity);
    item.currentQuantity = item.initialAvailableQuantity;
  } else item.currentQuantity = currentStock;
  res.json(item);
});

// check that there is at least one stock available.
// If there is enough stock available, it should reserve one item
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = Number(req.params.itemId);
  const item = getItemById(itemId);
  const noStock = { status: 'Not enough stock available', itemId };
  const reservationConfirmed = { status: 'Reservation confirmed', itemId };

  if (!item) {
    res.json(notFound);
    return;
  }

  let currentStock = await getCurrentReservedStockById(itemId);
  if (currentStock === null) currentStock = item.initialAvailableQuantity;

  if (currentStock <= 0) {
    res.json(noStock);
    return;
  }

  reserveStockById(itemId, Number(currentStock) - 1);

  res.json(reservationConfirmed);
});
