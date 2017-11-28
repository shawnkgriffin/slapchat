const ENV = process.env.NODE_ENV || "development";
if (ENV === "development") {
  require("dotenv").config();
}
const knexConfig = require("../knexfile.js");
const knex = require("knex")(knexConfig[ENV]);
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const jwt = require("jsonwebtoken");
const socketioJwt = require("socketio-jwt");
const bodyparser = require("body-parser");
const uuidv4 = require("uuid/v4");
const path = require("path");
const geolib = require("geolib");

let users = [];

// Define the constants and store the timers for moving people around
let timeoutUsersMove = null; // timer used to randomly move people.
const MOVE_INTERVAL = 1; // move users every 1 seconds.
const MOVE_SPEED = 100; // speed to move users in km/hr

app.use(bodyparser.json());
app.use(express.static("./server/public"));

const staticPath = path.resolve(__dirname, "..", "build");
console.log("/public", staticPath);
app.use(express.static(staticPath));

server.listen(process.env.PORT || 3001);

if (ENV === "development") {
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });
}

app.put("/login", (req, res) => {
  const password = req.body.password;
  knex("users")
    .where({ email: req.body.email })
    .select()
    .then(users => {
      if (users.length === 0) {
        res.json({
          error: "No user with email"
        });
      } else if (password !== users[0].password) {
        return res.json({ error: "Incorrect password" });
      } else {
        let user = users[0];

        user.position = { lat: user.lat, lng: user.lng };

        res.json({ token: jwt.sign({ user_id: user.id }, "secret"), user });
      }
    });
});
app.get("/logout", (req, res) => {
  res.redirect("/");
});

server.listen(process.env.PORT || 3001);

io.use(
  socketioJwt.authorize({
    secret: "secret",
    handshake: true
  })
);

//Socket on connect
io.sockets.on("connection", socket => {
  users.push(socket.decoded_token.user_id);
  io.sockets.emit("login_users", users);

  //Disconnect
  socket.on("disconnect", data => {
    users.splice(users.indexOf(socket), 1);
    io.sockets.emit("login_users", users);
  });

  ///////////////////////////////////////////////////////////////////////////
  // Define all the user data functions here for closure.
  // getUsers is called at the beginning to load all the users for a newly logged in person

  function currentUser(user) {
    socket.emit("current", user);
  }

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
        movedUser.position = { lat: movedUser.lat, lng: movedUser.lng };
        io.sockets.emit("user.move", movedUser);
      });
  }
  function userLocate(user) {
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
      .then(userArray => {
        let movedUser = userArray[0];
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
      .then(markers => {
        markers.forEach(marker => {
          marker.position = { lat: marker.lat, lng: marker.lng };
          marker.visible = true;
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
        lng: marker.lng,
        type: marker.type,
        label: marker.label,
        description: marker.description,
        icon: marker.icon
      })
      .then(markerArray => {
        let newMarker = markerArray[0];
        newMarker.position = { lat: newMarker.lat, lng: newMarker.lng };
        io.sockets.emit("marker.add", newMarker);
      });
  }
  function markerDelete(marker) {
    knex("markers")
      .where("id", "=", marker.id)
      .delete()
      .then(rows => {
        io.sockets.emit("marker.delete", marker);
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
  function markerLocate(marker) {
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
  function circleDelete(circle) {
    knex("circles")
      .where("id", "=", circle.id)
      .delete()
      .then(rows => {
        io.sockets.emit("circle.delete", circle);
      });
  }
  /**
   * Randomly move users around.
   * Check to see if they are in range of a circle, if so issue an alert (once)
   * @function usersMove
   * @param {integer} commandArray - tokenized array
   */
  function usersMove(senderId, channelId, commandArray) {
    let bearing = 0; // bearing in degrees, 0 being north.
    const distance = MOVE_SPEED * 1000 / 3600 * MOVE_INTERVAL;

    let alerted = false; //only alert once
    switch (commandArray[1] || "") {
      case "north":
        break;
      case "south":
        bearing = 180;
        break;
      case "west":
        bearing = 270;
        break;
      case "east":
        bearing = 90;
        break;
      default:
        bearing = -1; // means random
    }

    // get the circles first as we only need to do this once.
    // TODO refactor into a Promise.all
    knex("circles")
      .select()
      .then(circles => {
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
            let bearings = users.map(
              user => (bearing === -1 ? Math.random() * 360 : bearing) // if bearing is -1 choose a random bearing
            );
            timeoutUsersMove = setInterval(() => {
              users.forEach((user, index) => {
                let newPosition = geolib.computeDestinationPoint(
                  { lat: user.lat, lon: user.lng },
                  distance,
                  bearings[index]
                );
                user.lat = newPosition.latitude;
                user.lng = newPosition.longitude;
                user.position = { lat: user.lat, lng: user.lng };
                userMove(user);
                //check if user is in circle
                //if so alert once.
                // issue an alert if we haven't already
                circles.forEach(circle => {
                  if (
                    !alerted &&
                    geolib.isPointInCircle(
                      { latitude: user.lat, longitude: user.lng },
                      { latitude: circle.lat, longitude: circle.lng },
                      circle.radius
                    )
                  ) {
                    let channel_message = {
                      channel_id: channelId,
                      sender_user_id: senderId,
                      content: `!alert ${user.display_name}(${
                        user.first_name
                      } ${user.last_name}) is close to ${circle.label}:${
                        circle.description
                      }.`
                    };
                    io.sockets.emit("channel_message.post", channel_message);
                    alerted = true;
                  }
                });
              });
            }, MOVE_INTERVAL * 1000);
          }); //users
      }); //circles
  }
  /**
   * stop user movement.
   * @function usersStop
   */
  function usersStop() {
    clearTimeout(timeoutUsersMove);
  }

  socket.on("init", () => {
    knex("users")
      .where("id", socket.decoded_token.user_id)
      .then(([user]) => {
        currentUser(user);
        getUsers(user);
        getChannels(user);
        getDirectMessages(user);
        getChannelMessages(user);
        getLayers(user);
        getMarkers(user);
        getCircles(user);
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
    //check for server specific commands
    if (channel_message.content.indexOf("!") !== -1) {
      const commandArray = channel_message.content.split(" ");
      switch (commandArray[0]) {
        case "!move":
          usersMove(
            channel_message.sender_user_id,
            channel_message.channel_id,
            commandArray
          );
          break;
        case "!stop":
          usersStop(commandArray);
          break;
        default:
          console.log("bot: understand not do I: ", channel_message.content);
      }
    }
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
  //Just locate the marker on the map. This is used when a marker is moved by dispatch to send the user to a new position
  socket.on("marker.locate", marker => {
    markerLocate(marker);
  });

  socket.on("marker.add", marker => {
    markerAdd(marker);
  });
  socket.on("marker.delete", marker => {
    markerDelete(marker);
  });

  // User functions
  // user.move contains id=userId and lat, lng of new position
  socket.on("user.move", user => {
    userMove(user);
  });

  //Just locate the user on the map. This is used when a user is moved by dispatch to send the user to a new position
  socket.on("user.locate", user => {
    userLocate(user);
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
  socket.on("circle.delete", circle => {
    circleDelete(circle);
  });
});
