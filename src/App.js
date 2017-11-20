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
      currentUser: null
    };
    this.onNewMessage = this.onNewMessage.bind(this);
  }

  //RECIVES STATE DATA
  componentDidMount() {
    this.socket = io("localhost:3001");

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
    this.socket.on("users", users => {
      this.setState({ users: users });
    });
    this.socket.on("channels", channels => {
      this.setState({ channels: channels });
    });
    this.socket.on("direct_messages", direct_messages => {
      this.setState({ direct_messages: direct_messages });
    });
    this.socket.on("channel_messages", channel_messages => {
      console.log("CHANNEL_MESSAGES", channel_messages);
      channel_messages.type = "channel_messages";
      this.setState({ channel_messages: channel_messages });
    });
  }
  onNewMessage = function onNewMessage(message) {
    console.log("MESSAGE TYPE", message);
    message.type === "direct_message"
      ? this.socket.emit("direct_message.post", {
          sender_user_id: 41,
          recipient_user_id: 42,
          content: message.content
        })
      : this.socket.emit("channel_message.post", {
          sender_user_id: 41,
          channel_id: 16,
          content: message.content
        });
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
