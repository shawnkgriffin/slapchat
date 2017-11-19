require("dotenv").config();

const ENV           = process.env.ENV || "development";
const knexConfig    = require("../db/.knex/knexfile.js");
const knex          = require("knex")(knexConfig[ENV]);
const express       = require('express');
const app           = express();
const server        = require('http').createServer(app);
const io            = require('socket.io').listen(server);
const uuidv4        = require('uuid/v4');

let connections = [];

// Set up the seed database
// TODO refactor into a require file.

let state = require('./seed.js')

server.listen(process.env.PORT || 3001);

console.log("/public", __dirname + "/public");
app.use(express.static("public"));

//Index HTML is for debugging
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//Socket on connect
io.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);
    io.sockets.emit('state', state.seed)

    //Disconnect
    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected %s sockets connnected', connections.length);
    });

    //Get Users
    socket.on('users.get', (user) => {
      knex.select().from("users")
        .then(users => {
          socket.emit("users", users)
        });
    });

    //Get Channels
    socket.on("channels.get", channel => {
      knex.select().from("channels")
        .then(channels => {
          socket.emit("channels", channels);
        });
    });
    
    //Get Direct_Messages
    socket.on("direct_messages.get", direct_message => {
      knex.select().from("direct_messages")
        .then(direct_messages => {
            console.log("DMS", direct_messages);
            socket.emit("direct_messages", direct_messages);
        });
    });

    //Post Direct_Messages
    socket.on("direct_message.post", direct_message => {
        console.log(direct_message)
        knex.insert(direct_message).into("direct_messages").returning("id")
        .then((id) => {
            direct_message.id = id
            io.sockets.emit("direct_message.post", direct_message)
        })
    });

    //Post Channel_Message
    socket.on("channel_message.post", channel_message => {
        console.log(channel_message);
        knex.insert(channel_message).into("channel_messages").returning("id")
        .then(id => {
            channel_message.id = id
            io.sockets.emit("channel_message.post", channel_message)
        });
    });

    //Get Channel_Messages
     socket.on("channel_messages.get", channel_message => {
       knex.select().from("channel_messages")
        .then(channel_messages => {
            console.log("CMS", channel_messages);
            socket.emit("channel_messages", channel_messages);
         });
     });

    //Recieve Messages
    socket.on('chat.postmessage', (message) => {
        message.id = uuidv4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1' 
        state.seed.messages.push(message)
        io.sockets.emit('state', state.seed)
    });

    // User moves
    socket.on('user.move', (data) => {
        console.log( 'user.move', data.user, data.position)
        state.seed.users.forEach(user => {
            if (user.id === data.user) {
                user.position = data.position
            }
        })
        io.sockets.emit('state', state.seed)
    })
});
