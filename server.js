// server.js
const jsonServer = require('json-server');
const socketServer = require('http').createServer();
const io = require('socket.io')(socketServer);

const server = jsonServer.create();
const router = jsonServer.router('./data/db.json');
const middlewares = jsonServer.defaults();

server.patch('/parkingAreas/:id', (req, res, next) => {
  const { method, url } = req;
  console.log(`Event: ${url} ${method}ed! `);
  io.emit('parkingAreas', 'parking areas updated');
  next();
});

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running at port 3000');
});

socketServer.listen(3001, () => {
  console.log('Socket Server is running at port 3001');
});

