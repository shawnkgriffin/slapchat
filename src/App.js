import React, { Component } from "react";
import io from "socket.io-client";
import Map from "./Map.js";
import MessageList from "./MessageList.js";
import SideBar from "./SideBar.js";
import NavBar from "./NavBar.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      direct_messages: [],
      channel_messages: [],
      messages: [],
      channels: [],
      markers: [],
      layers: [],
      loading: false,
      currentUser: null,
      currentChannel: null,
      currentDirectMessage: null
    };
    this.onNewMessage = this.onNewMessage.bind(this);
    this.sendServer = this.sendServer.bind(this);
    this.onChannelCallback = this.onChannelCallback.bind(this);
    this.onUserCallback = this.onUserCallback.bind(this);
  }

  //RECIVES STATE DATA
  componentDidMount() {
    this.socket = io("localhost:3001");

    this.socket.emit("users.get", {
      user: 0
    });
    this.socket.emit("layers.get", {
      user: 0
    });
    this.socket.emit("markers.get", {
      user: 0
    });
    this.socket.emit("channels.get", {
      user: 0
    });
    this.socket.emit("direct_messages.get", {
      user: 0
    });
    this.socket.emit("channel_messages.get", {
      user: 0
    });
    this.socket.emit("markers.get", {
      user: 0
    });
    this.socket.on("users", users => {
      this.setState({ users: users, currentUser: users[0] });
      console.log("users", users[0].id);
    });
    this.socket.on("channels", channels => {
      this.setState({ channels: channels, currentChannel: channels[0].id });
      console.log("channels", channels[0].id);
    });
    this.socket.on("direct_messages", direct_messages => {
      this.setState({ direct_messages: direct_messages });
    });
    this.socket.on("channel_messages", channel_messages => {
      channel_messages.type = "channel_messages";
      this.setState({ channel_messages: channel_messages });
    });
    this.socket.on("channel_message.post", channel_message => {
      console.log("channel_message.post", channel_message);
      channel_message.avatar = this.state.currentUser.avatar;
      channel_message.display_name = this.state.currentUser.display_name;
      this.setState({
        channel_messages: this.state.channel_messages.concat(channel_message)
      });
    });
    this.socket.on("direct_message.post", direct_message => {
      console.log("direct_message.post", direct_message);
      direct_message.avatar = this.state.currentUser.avatar;
      direct_message.display_name = this.state.currentUser.display_name;
      this.setState({
        direct_messages: this.state.direct_messages.concat(direct_message)
      });
    });
    this.socket.on("markers", markers => {
      this.setState({ markers: markers });
    });
    this.socket.on("layers", layers => {
      this.setState({ layers: layers });
    });
    this.socket.on("user.move", userPosition => {
      console.log("user.move", userPosition);
    });
  }

  // when we get a new message, send it to the server
  // this will be called from the ChatBar component when a user presses the enter key.
  onNewMessage = function onNewMessage(content) {
    // Send the msg object as a JSON-formatted string.
    let action =
      this.state.currentChannel != null
        ? "channel_message.post"
        : "direct_message.post";
    let payload = {};

    if (action === "channel_message.post") {
      payload = {
        sender_user_id: this.state.currentUser.id,
        channel_id: this.state.currentChannel,
        content: content
      };
    } else {
      payload = {
        sender_user_id: this.state.currentUser,
        recipient_user_id: this.state.currentDirectMessage,
        content: content
      };
    }
    console.log("onNewMessage", action, payload);
    this.socket.emit(action, payload);
  };

  // When a lower level component needs to send something to the server
  // it calls sendServer(action, payload)
  sendServer = function sendServer(action, payload) {
    console.log("sendServer", action, payload);
    this.socket.emit(action, payload);
  };

  //this callback is when the user clicks on a channel
  onChannelCallback = function onChannelCallback(channel) {
    console.log("Channel Callback", channel);
    // set the messages container to point to the current channel
    this.setState({
      messages: this.state.channel_messages.filter(
        channel_message => channel_message.channel_id === channel.id
      )
    });
  };

  //this callback is when the user clicks on a channel
  onUserCallback = function onUserCallback(user) {
    console.log("User Callback", user);
    // set the messages container to point to the current channel
    this.setState({
      messages: this.state.direct_messages.filter(
        direct_message =>
          (direct_message.sender_user_id === this.state.currentUser.id &&
            direct_message.recipient_user_id === user.id) ||
          (direct_message.sender_user_id === user.id &&
            direct_message.recipient_user_id === this.state.currentUser.id)
      )
    });
  };

  render() {
    return (
      <div className="fixed-container">
        <SideBar
          onChannelCallback={this.onChannelCallback}
          onUserCallback={this.onUserCallback}
          users={this.state.users}
          channels={this.state.channels}
          currentUser={this.state.currentUser}
        />
        <main className="nav-and-content">
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
                users={this.state.users}
              />
            </section>
          )}
        </main>
      </div>
    );
  }
}

export default App;
