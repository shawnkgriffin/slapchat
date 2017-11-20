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
      loading: false,
      currentUser: null,
      currentChannel: null,
      currentDirectMessage: null
    };
    this.onNewMessage = this.onNewMessage.bind(this);
  }

  //RECIVES STATE DATA
  componentDidMount() {
    this.socket = io("localhost:3001");
    // this.socket.on("state", slapState => {
    //   this.setState({
    //     ...slapState,
    //     loading: false,
    //     currentUser: slapState.users[0]
    //   });
    // });
    this.socket.emit("users.get", {
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
    // this.socket.emit("direct_message.post", {
    //   sender_user_id: 2,
    //   recipient_user_id: 3,
    //   content: "text"
    // });
    // this.socket.emit("channel_message.post", {
    //   sender_user_id: 2,
    //   channel_id: 3,
    //   content: "text"
    // });
    this.socket.on("users", users => {
      this.setState({ users: users, currentUser: users[0].id });
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
      this.setState({ channel_messages: channel_messages });
    });

    // TODO fix this.
    // this.socket.on("channel_message.post", channel_message => {
    //   this.setState({
    //     channel_messages: this.state.channel_messages.push(channel_message)
    //   });
    // });
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
        sender_user_id: this.state.currentUser,
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

  render() {
    return (
      <div className="fixed-container">
        <SideBar users={this.state.users} channels={this.state.channels} />
        <main className="nav-and-content">
          <NavBar />
          {this.state.loading ? (
            <div>Loading</div>
          ) : (
            <section className="messages-and-map">
              <MessageList
                channel_messages={this.state.channel_messages}
                direct_messages={this.state.direct_messages}
                onNewMessage={this.onNewMessage}
              />
              {/* <Map slapMap={this.state.slapMap} users={this.state.users} /> */}
            </section>
          )}
        </main>
      </div>
    );
  }
}

export default App;
