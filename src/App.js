import React, { Component } from "react";
import { animateScroll } from "react-scroll";
import io from "socket.io-client";
import Map from "./Map.js";
import MessageList from "./MessageList.js";
import StaticSideBar from "./StaticSideBar.js";
import NavBar from "./NavBar.js";
import Login from "./Login.js";
import Register from "./Register.js";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import Sidebar from "react-sidebar";
const textStyle = {
  color: "red",
  fontstyle: "italic"
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      users: [],
      direct_messages: [],
      channel_messages: [],
      messages: [],
      channels: [],
      markers: [],
      circles: [],
      layers: [],
      loading: false,
      currentUser: null,
      currentChannelId: null,
      currentDirectMessageId: null,
      generalChannel: 0, //general channel is a special channel.
      isAuth: ""
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

  //RECIVES STATE DATA
  componentDidMount() {
    this.socket = io(this.connectionString);

    this.socket.on("connect", () => {
      console.info("connected to web socket");
    });

    this.socket.on("users", users => {
      // create markers for the users
      // remove any existing user markers
      let userMarkers = this.state.markers.filter(
        marker => marker.type !== "USER"
      );
      users.forEach(user =>
        userMarkers.push({
          icon: "/skiing-blue.png",
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
    this.socket.on("user.logged_in", user => {
      this.setState({ currentUser: user, isAuth: "" });
    });

    this.socket.on("channels", channels => {
      const generalChannel =
        channels.find(channel => channel.name === "General").id || 0;
      this.setState({
        channels: channels,
        currentChannelId: generalChannel,
        generalChannel: generalChannel
      });
    });
    this.socket.on("direct_messages", direct_messages => {
      this.setState({ direct_messages: direct_messages });
    });
    this.socket.on("channel_messages", channel_messages => {
      channel_messages.type = "channel_messages";
      this.setState({ channel_messages: channel_messages });
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
          onShow: function() {
            console.log("aye!");
          },
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
        this.setState(
          {
            currentChannelId: null,
            currentDirectMessageId: direct_message.recipient_user_id,
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
      }
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
          marker => !(marker.type === "MARKER" && marker.id === deleteMarker.id)
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
        icon: "/skiing-blue.png",
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

    this.socket.on("user.login_pass_error", () => {
      this.setState({ isAuth: "Incorrect Email or Password" });
    });
    this.socket.on("user.login_email_error", () => {
      this.setState({ isAuth: "Incorrect Email or Password" });
    });
  }
  sendNewRegister(newRegister) {
    this.socket.emit("user.register", newRegister);
  }

  sendNewLogin(newLogin) {
    this.socket.emit("user.login", newLogin);
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
        channel_id: this.state.currentChannelId || this.state.generalChannel,
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
    const sidebarContent = (
      <b>
        <button>Logout</button>
      </b>
    );
    if (this.state.currentUser === null) {
      if (this.state.isAuth !== "") {
        return (
          <div>
            <h1> Welcome to Slap </h1>
            <span style={textStyle}>{this.state.isAuth}</span>
            <Login sendNewLogin={this.sendNewLogin} />
            <Register sendNewRegister={this.sendNewRegister} />
          </div>
        );
      } else {
        return (
          <div>
            <h1> Welcome to Slap! </h1>
            <Login sendNewLogin={this.sendNewLogin} />
            <Register sendNewRegister={this.sendNewRegister} />
          </div>
        );
      }
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
        />
        <main className="nav-and-content">
          <Alert stack={{ limit: 3 }} />
          <NavBar currentUser={this.state.currentUser} />
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
              />
            </section>
          )}
        </main>
        <Sidebar
          sidebar={sidebarContent}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
        />
      </div>
    );
  }
}

export default App;
