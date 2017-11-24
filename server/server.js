require("dotenv").config();

const ENV = process.env.ENV || "development";
const knexConfig = require("../knexfile.js");
const knex = require("knex")(knexConfig[ENV]);
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

let connections = [];

server.listen(process.env.PORT || 3001);

app.use(express.static("./server/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//Socket on connect
io.sockets.on("connection", socket => {
  connections.push(socket);
  let isLoggedIn = false;
  console.log("Connected: %s sockets connected", connections.length);

  //Disconnect
  socket.on("disconnect", data => {
    connections.splice(connections.indexOf(socket), 1);
    isLoggedIn = false;
    console.log("Disconnected %s sockets connnected", connections.length);
  });

  ///////////////////////////////////////////////////////////////////////////
  // Define all the user data functions here for closure.
  // getUsers is called at the beginning to load all the users for a newly logged in person
  function getUsers(user) {
    knex("users")
      .select()
      .returning([
        // avoid returning password
        "id",
        "first_name",
        "last_name",
        "display_name",
        "email",
        "avatar",
        "lat",
        "lng"
      ])
      .then(users => {
        users.forEach(user => {
          user.position = { lat: user.lat, lng: user.lng };
        });
        socket.emit("users", users);
      });
  }
  function userMove(user) {
    knex("users")
      .where("id", "=", user.id)
      .returning([
        "id",
        "first_name",
        "last_name",
        "display_name",
        "email",
        "avatar",
        "lat",
        "lng"
      ])
      .update({
        lat: user.lat,
        lng: user.lng
      })
      .then(userArray => {
        let movedUser = userArray[0];
        console.log("movedUser", movedUser);
        movedUser.position = { lat: movedUser.lat, lng: movedUser.lng };
        io.sockets.emit("user.move", movedUser);
      });
  }
  // Get all the channels for a user
  function getChannels(user) {
    knex
      .select()
      .from("channels")
      .then(channels => {
        socket.emit("channels", channels);
      });
  }
  function getChannelMessages(user) {
    knex("channel_messages")
      .join("users", "channel_messages.sender_user_id", "=", "users.id")
      .then(channel_messages => {
        socket.emit("channel_messages", channel_messages);
      });
  }
  function getDirectMessages(user) {
    knex("direct_messages")
      .join("users", "direct_messages.sender_user_id", "=", "users.id")
      .select(
        "direct_messages.sender_user_id",
        "direct_messages.recipient_user_id",
        "direct_messages.content",
        "users.id",
        "users.first_name",
        "users.last_name",
        "users.display_name",
        "users.email",
        "users.avatar"
      )
      .then(direct_messages => {
        socket.emit("direct_messages", direct_messages);
      });
  }

  function getLayers(user) {
    knex
      .select()
      .from("layers")
      .then(layers => {
        socket.emit("layers", layers);
      });
  }

  // Markers
  function getMarkers(user) {
    knex("markers")
      .select()
      .then(markers => {
        markers.forEach(marker => {
          marker.position = { lat: marker.lat, lng: marker.lng };
        });
        socket.emit("markers", markers);
      });
  }

  function markerAdd(marker) {
    knex("markers")
      .returning([
        "id",
        "label",
        "lat",
        "lng",
        "owner_user_id",
        "icon",
        "type",
        "draggable"
      ])
      .insert({
        lat: marker.lat,
        lng: marker.lng
      })
      .then(markerArray => {
        let newMarker = markerArray[0];
        newMarker.position = { lat: newMarker.lat, lng: newMarker.lng };
        io.sockets.emit("marker.add", newMarker);
      });
  }
  function markerMove(marker) {
    knex("markers")
      .where("id", "=", marker.id)
      .returning([
        "id",
        "label",
        "lat",
        "lng",
        "owner_user_id",
        "icon",
        "type",
        "draggable"
      ])
      .update({
        lat: marker.lat,
        lng: marker.lng
      })
      .then(markerArray => {
        let movedMarker = markerArray[0];
        movedMarker.position = { lat: movedMarker.lat, lng: movedMarker.lng };
        io.sockets.emit("marker.move", movedMarker);
      });
  }

  // Circles
  function getCircles(user) {
    knex("circles")
      .select()
      .then(circles => {
        circles.forEach(circle => {
          circle.center = { lat: circle.lat, lng: circle.lng };
        });
        socket.emit("circles", circles);
      });
  }
  function circleMove(circle) {
    knex("circles")
      .returning([
        "id",
        "lat",
        "lng",
        "radius",
        "owner_user_id",
        "label",
        "description",
        "draggable"
      ])
      .where("id", "=", circle.id)
      .update({
        lat: circle.lat,
        lng: circle.lng
      })
      .then(circleArray => {
        let movedCircle = circleArray[0];
        movedCircle.center = { lat: movedCircle.lat, lng: movedCircle.lng };
        io.sockets.emit("circle.move", movedCircle);
      });
  }
  function circleAdd(circle) {
    console.log("circleAdd(", circle);
    knex("circles")
      .returning([
        "id",
        "lat",
        "lng",
        "radius",
        "owner_user_id",
        "label",
        "description",
        "draggable"
      ])
      .insert({
        label: circle.label,
        description: circle.description,
        lat: circle.lat,
        lng: circle.lng,
        radius: circle.radius
      })
      .then(circleArray => {
        let newCircle = circleArray[0];
        newCircle.center = { lat: newCircle.lat, lng: newCircle.lng };
        io.sockets.emit("circle.add", newCircle);
      });
  }
  ///////////////////////////////////////////////////////////////////////////
  // Here is all the socket state information.
  // socket.on("user.register", user => {
  //   knex
  //     .insert(user)
  //     .into("users")
  //     .returning("id");.then(id => {

  //     })
  // });
  socket.on("user.login", user => {
    const password = user.password;
    knex("users")
      .where({ email: user.email })
      .select()
      .then(users => {
        if (users.length == 0) {
          socket.emit("user.login_email_error");
        } else if (password !== users[0].password) {
          socket.emit("user.login_pass_error");
        } else {
          isLoggedIn = true;
          let user = users[0];

          user.position = { lat: user.lat, lng: user.lng };
          socket.emit("user.logged_in", user);

          // User is logged in, send them the user info,
          // existing users, channels, messages, maps and markers
          getUsers(user);
          getChannels(user);
          getDirectMessages(user);
          getChannelMessages(user);
          getLayers(user);
          getMarkers(user);
          getCircles(user);
        }
      });
  });

  //Get Users
  socket.on("users.get", user => {
    getUsers(user);
  });

  // Get Channels
  socket.on("channels.get", user => {
    getChannels(user);
  });

  //Get Direct_Messages
  socket.on("direct_messages.get", user => {
    getDirectMessages(user);
  });
  //Get Layers
  socket.on("layers.get", user => {
    getLayers(user);
  });

  //Get Markers
  socket.on("markers.get", user => {
    getMarkers(user);
  });

  //Post Direct_Messages
  socket.on("direct_message.post", direct_message => {
    knex
      .insert(direct_message)
      .into("direct_messages")
      .returning("id")
      .then(id => {
        direct_message.id = id;
        io.sockets.emit("direct_message.post", direct_message);
      });
  });

  //Post Channel_Message
  socket.on("channel_message.post", channel_message => {
    knex
      .insert(channel_message)
      .into("channel_messages")
      .returning("id")
      .then(id => {
        channel_message.id = id;
        io.sockets.emit("channel_message.post", channel_message);
      });
  });

  //Get Channel_Messages
  socket.on("channel_messages.get", user => {
    getChannelMessages(user);
  });

  //Marker functions
  socket.on("marker.move", marker => {
    markerMove(marker);
  });

  socket.on("marker.add", marker => {
    markerAdd(marker);
  });

  // User functions
  // user.move contains id=userId and lat, lng of new position
  socket.on("user.move", user => {
    userMove(user);
  });

  // Circle functions
  socket.on("circle.add", circle => {
    circleAdd(circle);
  });

  socket.on("circles.get", user => {
    getCircles(user);
  });
  socket.on("circle.move", circle => {
    circleMove(circle);
  });
});
