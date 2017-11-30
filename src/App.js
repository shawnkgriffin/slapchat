import React, { Component } from "react";
import { animateScroll } from "react-scroll";
import io from "socket.io-client";
import Map from "./Map.js";
import MessageList from "./MessageList.js";
import StaticSideBar from "./StaticSideBar.js";
import NavBar from "./NavBar.js";
import Login from "./Login.js";
// import Register from "./Register.js";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      login_users: [],
      users: [],
      direct_messages: [],
      channel_messages: [],
      messages: [],
      channels: [],
      markers: [],
      circles: [],
      layers: [],
      httpRes: true,
      loading: true,
      currentUser: null,
      currentChannelId: null,
      currentDirectMessageId: null,
      generalChannelId: 0, //general channel is a special channel.
      isAuth: "",
      defaultCenter: { lat: 50.093284, lng: -122.93494 } // Whistler
    };

    /* eslint-disable no-restricted-globals */
    if (location.hostname === "localhost") {
      this.connectionString = "http://localhost:3001";
    } else {
      this.connectionString = `${location.protocol}//${
        location.hostname
      }:${location.port || (location.protocol === "https:" ? 443 : 80)}`;
    }
    /* eslint-enable no-restricted-globals */

    this.onNewMessage = this.onNewMessage.bind(this);
    this.dropMarkerCircle = this.dropMarkerCircle.bind(this);
    this.sendServer = this.sendServer.bind(this);
    this.onChannelCallback = this.onChannelCallback.bind(this);
    this.onUserCallback = this.onUserCallback.bind(this);
    this.sendNewLogin = this.sendNewLogin.bind(this);
    this.sendNewRegister = this.sendNewRegister.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  //Beep attached to alert
  componentWillMount() {
    let beep = this.props.beep;
    let condition = this.props.condition;
    if (beep && typeof beep === "string") {
      this.alertAudio = new Audio(beep);
      this.alertAudio.load();
      this.alertAudio.play();
    }
    if (beep && typeof beep === "object" && condition === "warning") {
      this.alertAudio = new Audio(beep.warning);
      this.alertAudio.load();
      this.alertAudio.play();
    }
  }

  //Checks for JWT
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token === "undefined") {
      this.setState({
        loading: false
      });
    }
    if (!token) {
      this.setState({
        loading: false
      });
    } else {
      this.setupSocket(token);
    }
  }

  //RECIVES STATE DATA

  //Sets Socked query to value of JWT
  setupSocket(token) {
    this.socket = io(this.connectionString, { query: "token=" + token });
    // successful login will cause everything to fill
    this.socket.on("current", user => {
      this.setState({
        currentUser: user,
        loading: false,
        httpRes: true
      });
      this.socket.on("connect", () => {
        console.info("connected to web socket");
      });
    });

    // create markers for the users
    // remove any existing user markers
    this.socket.on("users", users => {
      let userMarkers = this.state.markers.filter(
        marker => marker.type !== "USER"
      );
      users.forEach(user =>
        userMarkers.push({
          icon: `./${user.display_name}Icon.png`,
          position: user.position,
          label: user.display_name,
          type: "USER",
          visible: true,
          draggable: true,
          userId: user.id
        })
      );
      this.setState({
        users: users,
        markers: this.state.markers.concat(userMarkers)
      });
    });

    this.socket.on("channels", channels => {
      const generalChannelId =
        channels.find(channel => channel.name === "General").id || 0;
      this.setState({
        channels: channels,
        currentChannelId: generalChannelId,
        generalChannelId: generalChannelId
      });
    });
    this.socket.on("direct_messages", direct_messages => {
      this.setState({ direct_messages: direct_messages });
    });
    this.socket.on("channel_messages", channel_messages => {
      channel_messages.type = "channel_messages";
      this.setState({ channel_messages: channel_messages });
    });
    this.socket.on("login_users", userArr => {
      this.setState({ login_users: userArr });
    });

    this.socket.on("logout_users", userArr => {
      console.log("USER ARR", userArr);
      this.setState({ login_users: userArr });
    });

    // if we get a new message on a channel
    this.socket.on("channel_message.post", channel_message => {
      if (channel_message.content.indexOf("!alert") !== -1) {
        const content = channel_message.content.replace("!alert ", "");
        Alert.error(content, {
          position: "top-right",
          effect: "slide",
          onShow: function() {},
          beep: true,
          timeout: "none",
          offset: 100
        });
      }
      channel_message.avatar = this.state.users.find(
        user => user.id === channel_message.sender_user_id
      ).avatar;
      channel_message.display_name = this.state.users.find(
        user => user.id === channel_message.sender_user_id
      ).display_name;
      let channel_messages = this.state.channel_messages.concat(
        channel_message
      );
      this.setState({
        channel_messages: channel_messages
      });
      // check to see if we need to upate the message list
      if (channel_message.channel_id === this.state.currentChannelId)
        this.setState({
          messages: channel_messages.filter(
            channel_message =>
              channel_message.id === this.state.currentChannelId
          )
        });
      this.setState({
        currentChannelId: this.state.currentChannelId,
        currentDirectMessageId: null,
        messages: this.state.channel_messages.filter(
          channel_message =>
            channel_message.channel_id === this.state.currentChannelId
        )
      });
    });

    // Receive a direct message
    this.socket.on("direct_message.post", direct_message => {
      if (direct_message.content.indexOf("!alert") !== -1) {
        Alert.error(direct_message.content, {
          position: "top-right",
          effect: "slide",
          onShow: function() {},
          beep: true,
          timeout: "none",
          offset: 100
        });
      }

      direct_message.avatar = this.state.users.find(
        user => user.id === direct_message.sender_user_id
      ).avatar;
      direct_message.display_name = this.state.users.find(
        user => user.id === direct_message.sender_user_id
      ).display_name;
      let direct_messages = this.state.direct_messages.concat([direct_message]);
      this.setState({
        direct_messages: direct_messages
      });
      if (
        (direct_message.sender_user_id === this.state.currentDirectMessageId &&
          direct_message.recipient_user_id === this.state.currentUser.id) ||
        (direct_message.sender_user_id === this.state.currentUser.id &&
          direct_message.recipient_user_id ===
            this.state.currentDirectMessageId)
      ) {
        this.setState({
          messages: direct_messages.filter(
            message =>
              (direct_message.sender_id === this.state.currentDirectMessageId &&
                direct_message.recipient_user_id ===
                  this.state.currentUser.id) ||
              (direct_message.sender_id === this.state.currentUser.id &&
                direct_message.recipient_user_id ===
                  this.state.currentDirectMessageId)
          )
        });
      }
      console.log("HERE", direct_message.recipient_user_id);
      this.setState(
        {
          currentChannelId: null,
          // currentDirectMessageId: direct_message.recipient_user_id,
          messages: this.state.direct_messages.filter(
            direct_message =>
              (direct_message.sender_user_id ===
                this.state.currentDirectMessageId &&
                direct_message.recipient_user_id ===
                  this.state.currentUser.id) ||
              (direct_message.sender_user_id === this.state.currentUser.id &&
                direct_message.recipient_user_id ===
                  this.state.currentDirectMessageId)
          )
        },
        this.scrollToBottom
      );
    });
    // add in the markers, don't remove the USERS
    this.socket.on("markers", markers => {
      let newMarkers = this.state.markers.filter(
        marker => marker.type !== "MARKER"
      );
      this.setState({ markers: newMarkers.concat(markers) });
    });

    this.socket.on("marker.add", marker => {
      this.setState({ markers: this.state.markers.concat([marker]) });
    });
    this.socket.on("marker.delete", deleteMarker => {
      this.setState({
        markers: this.state.markers.filter(
          // Don't delete users
          marker => !(marker.type !== "USER" && marker.id === deleteMarker.id)
        )
      });
    });
    this.socket.on("marker.move", newMarker => {
      this.setState({
        markers: this.state.markers.map(marker => {
          return marker.id === newMarker.id ? newMarker : marker;
        })
      });
    });

    // Circles
    this.socket.on("circles", circles => {
      this.setState({ circles: circles });
    });
    this.socket.on("circle.add", circle => {
      this.setState({ circles: this.state.circles.concat([circle]) });
    });
    this.socket.on("circle.move", movedCircle => {
      this.setState({
        circles: this.state.circles.map(circle => {
          return circle.id === movedCircle.id ? movedCircle : circle;
        })
      });
    });
    this.socket.on("circle.delete", deleteCircle => {
      this.setState({
        circles: this.state.circles.filter(
          circle => !(circle.id === deleteCircle.id)
        )
      });
    });

    // layers
    this.socket.on("layers", layers => {
      this.setState({ layers: layers });
    });

    // User moves
    this.socket.on("user.move", user => {
      const newUserMarker = {
        icon: `./${user.display_name}Icon.png`,
        position: user.position,
        label: user.display_name,
        type: "USER",
        draggable: true,
        userId: user.id
      };
      const newMarkers = this.state.markers.map(marker => {
        return marker.type === "USER" && marker.userId === user.id
          ? newUserMarker
          : marker;
      });
      this.setState({ markers: newMarkers });
    });

    this.socket.emit("init");
  }
  sendNewRegister(newRegister) {
    this.socket.emit("user.register", newRegister);
  }

  sendNewLogin(newLogin) {
    this.setState({ httpRes: false });
    fetch("/login", {
      method: "PUT",
      body: JSON.stringify(newLogin),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ httpRes: true });
        localStorage.setItem("token", data.token);
        this.setupSocket(data.token);
      });
  }

  // when we get a new message, send it to the server
  // this will be called from the ChatBar component when a user presses the enter key.
  onNewMessage = function onNewMessage(content) {
    // Send the msg object as a JSON-formatted string.
    let action = "";
    let payload = {};
    if (
      this.state.currentChannelId !== null ||
      !this.state.currentDirectMessageId // protect from a case where currentDirectMessageId is not set and use general channel.
    ) {
      action = "channel_message.post";
      payload = {
        sender_user_id: this.state.currentUser.id,
        channel_id: this.state.currentChannelId || this.state.generalChannelId,
        content: content
      };
    } else {
      action = "direct_message.post";
      payload = {
        sender_user_id: this.state.currentUser.id,
        recipient_user_id: this.state.currentDirectMessageId,
        content: content
      };
    }

    this.socket.emit(action, payload);
  };

  // When a lower level component needs to send something to the server
  // it calls sendServer(action, payload)
  sendServer = function sendServer(action, payload) {
    this.socket.emit(action, payload);
  };

  //this callback is when the user clicks on a channel
  onChannelCallback = function onChannelCallback(channel) {
    // set the messages container to point to the current channel
    this.setState({
      currentChannelId: channel.id,
      currentDirectMessageId: null,
      messages: this.state.channel_messages.filter(
        channel_message => channel_message.channel_id === channel.id
      )
    });
  };

  dropMarkerCircle(markerOrCircle, label, description, icon) {
    if (markerOrCircle) {
      this.sendServer("marker.add", {
        lat: this.state.defaultCenter.lat,
        lng: this.state.defaultCenter.lng,
        type: "MARKER",
        owner_user_id: this.state.currentUserId,
        label: label,
        description: description,
        icon: icon
      });
      // create a new marker as a new
    } else {
      this.sendServer("circle.add", {
        lat: this.state.defaultCenter.lat,
        lng: this.state.defaultCenter.lng,
        radius: 500,
        owner_user_id: this.state.currentUserId,
        label: label,
        description: description
      });
    }
  }

  //this callback is when the user clicks on a channel
  onUserCallback = function onUserCallback(user) {
    // set the messages container to point to the current channel
    this.setState({
      currentChannelId: null,
      currentDirectMessageId: user.id,
      messages: this.state.direct_messages.filter(
        direct_message =>
          (direct_message.sender_user_id === this.state.currentUser.id &&
            direct_message.recipient_user_id === user.id) ||
          (direct_message.sender_user_id === user.id &&
            direct_message.recipient_user_id === this.state.currentUser.id)
      )
    });
  };

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "messages-container"
    });
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  render() {
    if (this.state.httpRes === false) {
      return <div> ¯\_(ツ)_/¯</div>;
    }
    if (this.state.loading) {
      return <div>Loading</div>;
    }
    if (this.state.currentUser === null) {
      return (
        <div>
          <Login sendNewLogin={this.sendNewLogin} />
        </div>
      );
    }
    return (
      <div className="fixed-container">
        <StaticSideBar
          onChannelCallback={this.onChannelCallback}
          onUserCallback={this.onUserCallback}
          users={this.state.users}
          channels={this.state.channels}
          currentUser={this.state.currentUser}
          activeUserId={this.state.currentDirectMessageId}
          activeChannelId={this.state.currentChannelId}
          login_users={this.state.login_users}
        />
        <main className="nav-and-content">
          <Alert stack={{ limit: 3 }} />
          <NavBar
            currentUser={this.state.currentUser}
            dropMarkerCircle={this.dropMarkerCircle}
          />
          {this.state.loading ? (
            <div>Loading</div>
          ) : (
            <section className="messages-and-map">
              <MessageList
                messages={this.state.messages}
                onNewMessage={this.onNewMessage}
              />
              <Map
                sendServer={this.sendServer}
                markers={this.state.markers}
                circles={this.state.circles}
                generalChannelId={this.state.generalChannelId}
                currentUserId={this.state.currentUser.id}
              />
            </section>
          )}
        </main>
      </div>
    );
  }
}

export default App;
