const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const uuidv4 = require("uuid/v4");

let connections = [];

// Set up the seed database
// TODO refactor into a require file.

let state = require("./seed.js");
console.log(state.seed);

server.listen(process.env.PORT || 3001);

console.log("/public", __dirname + "/public");
app.use(express.static("public"));

//Index HTML is for debugging
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//Socket on connect
io.sockets.on("connection", socket => {
  connections.push(socket);
  console.log("Connected: %s sockets connected", connections.length);
  io.sockets.emit("state", state.seed);

  //Disconnect
  socket.on("disconnect", data => {
    connections.splice(connections.indexOf(socket), 1);
    console.log("Disconnected %s sockets connnected", connections.length);
  });

  //Recieve Messages
  socket.on("chat.postmessage", message => {
    message.id = uuidv4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
    state.seed.messages.push(message);
    io.sockets.emit("state", state.seed);
    console.log("chat.postmessage", message);
  });

  //Marker moves
  socket.on("marker.move", marker => {
    console.log("marker.move", marker);
    io.sockets.emit("marker.move", marker);
  });

  // User moves
  socket.on("user.move", data => {
    console.log("user.move", data.user, data.position);
    state.seed.users.forEach(user => {
      if (user.id === data.user) {
        user.position = data.position;
      }
    });
    io.sockets.emit("state", state.seed);
  });
});
