const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


module.exports = app;

app.use(express.static(__dirname));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  // res.sendFile(__dirname + '/script.js');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});