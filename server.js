const jsonServer = require('json-server');
// Initialize Socket.IO Server
const socketServer = require('http').createServer();
const io = require('socket.io')(socketServer);

// Initialize JSON Server
const server = jsonServer.create();
const router = jsonServer.router('./data/db.json');

// Set default middlewares (logger, static, cors and no-cache)
const middlewares = jsonServer.defaults();
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

// Broadcast `parkingAreas` PATCH requests
server.patch('/parkingAreas/:id', (req, res, next) => {
  const { id } = req.params;
  const { usedSlots } = req.body;
  console.log(`Parking Area ${id} updated to ${usedSlots} Used Slots`);
  io.emit('parkingAreas', { id, usedSlots });
  next();
});

// Use default router
server.use(router);

// Bind JSON Server
server.listen(3000, () => {
  console.log('JSON Server is running at port 3000');
});

// Bind Socket.IO Server
socketServer.listen(3001, () => {
  console.log('Socket.IO Server is running at port 3001');
});

