import React, { Component } from "react";
import { animateScroll } from "react-scroll";
import io from "socket.io-client";
import Map from "./Map.js";
import MessageList from "./MessageList.js";
import SideBar from "./SideBar.js";
import NavBar from "./NavBar.js";
import Login from "./Login.js";
import Register from "./Register.js";

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
      currentUser: null, // this is a user object
      currentChannelId: null, //this is a channel ID
      currentDirectMessageId: null //
    };

    this.onNewMessage = this.onNewMessage.bind(this);
    this.sendServer = this.sendServer.bind(this);
    this.onChannelCallback = this.onChannelCallback.bind(this);
    this.onUserCallback = this.onUserCallback.bind(this);
    this.sendNewLogin = this.sendNewLogin.bind(this);
    this.sendNewRegister = this.sendNewRegister.bind(this);
  }

  //RECIVES STATE DATA
  componentDidMount() {
    this.socket = io("localhost:3001");

    // successful login will cause everything to fill
    this.socket.emit("user.login", {
      email: "shawn@shawngriffin.com",
      password: "slapme"
    });

    this.socket.on("users", users => {
      this.setState({ users: users });
      console.log("users", users[0].id);
    });
    this.socket.on("user.logged_in", user => {
      this.setState({ currentUser: user });
    });
    this.socket.on("channels", channels => {
      this.setState({ channels: channels });
      console.log("channels", channels[0].id);
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
      console.log("channel_message.post", channel_message);
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
    });

    // Receive a direct message
    this.socket.on("direct_message.post", direct_message => {
      console.log("direct_message.post", direct_message);
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

      // check to see if we need to update the message list
      // logic is sender id = current direct message && recipient = currentUser or
      // sended id = current user && recipient === current direct message
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
                (direct_message.sender_user_id === this.state.currentUser.id &&
                  direct_message.recipient_user_id ===
                    direct_message.recipient_user_id) ||
                (direct_message.sender_user_id ===
                  direct_message.recipient_user_id &&
                  direct_message.recipient_user_id ===
                    this.state.currentUser.id)
            )
          },
          this.scrollToBottom
        );
      }
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
  sendNewRegister(newRegister) {
    console.log("NEW REGISTER", newRegister);
  }

  sendNewLogin(newLogin) {
    console.log("NEW LOGIN", newLogin);
  }
  // when we get a new message, send it to the server
  // this will be called from the ChatBar component when a user presses the enter key.
  onNewMessage = function onNewMessage(content) {
    // Send the msg object as a JSON-formatted string.
    let action =
      this.state.currentChannelId != null
        ? "channel_message.post"
        : "direct_message.post";
    let payload = {};

    if (action === "channel_message.post") {
      payload = {
        sender_user_id: this.state.currentUser.id,
        channel_id: this.state.currentChannelId,
        content: content
      };
    } else {
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
    console.log("Channel Callback", channel);
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
    console.log("User Callback", user);
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

  render() {
    return (
      <div className="fixed-container">
        <Login sendNewLogin={this.sendNewLogin} />
        <Register sendNewRegister={this.sendNewRegister} />
        <SideBar
          onChannelCallback={this.onChannelCallback}
          onUserCallback={this.onUserCallback}
          users={this.state.users}
          channels={this.state.channels}
          currentUser={this.state.currentUser}
          activeUserId={this.state.currentDirectMessageId}
          activeChannelId={this.state.currentChannelId}
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
