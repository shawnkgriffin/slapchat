const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

let connections = [];

server.listen(process.env.PORT || 3001)

//Index HTML is for debugging
app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
});

//Socket on connect
io.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    //Disconnect
    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected %s sockets connnected', connections.length);
    });
});
