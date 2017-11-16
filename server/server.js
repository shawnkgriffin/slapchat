const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

users = [];
connections = [];

server.listen(process.env.PORT || 3001)

app.get('/', (req, res) =>{
    res.sendfile(__dirname + '/index.html');
});
