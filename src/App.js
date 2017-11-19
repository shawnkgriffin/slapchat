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
      messages: [],
      channels: [],
      loading: true,
      currentUser: ""
    };
    this.onNewMessage = this.onNewMessage.bind(this);
  }

  //RECIVES STATE DATA
  componentDidMount() {
    this.socket = io("localhost:3001");
    this.socket.on("state", slapState => {
      this.setState({
        ...slapState,
        loading: false,
        currentUser: slapState.users[0]
      });
    });
    this.socket.emit("users.get", {
      user: 0,
    });
    this.socket.emit("channels.get", {
      user: 0,
    });
    this.socket.emit("direct_messages.get", {
      user: 0,
    });
    this.socket.emit("direct_message.post", {
      sender_user_id: 33,
      recipient_user_id: 34,
      content: "text"
    });
    this.socket.emit("channel_messages.get", {
      user: 0,
    });
    this.socket.emit("channel_message.post", {
      sender_user_id: 33,
      channel_id: 13,
      content: "text"
    });
    this.socket.on("users", users => {
      this.setState({users: users})
    });
    this.socket.on("channels", channels => {
      this.setState({channels: channels})
    })
    this.socket.on("direct_messages", direct_messages => {
      this.setState({direct_messages: direct_messages})
    })
    this.socket.on("channel_messages", channel_messages => {
      this.setState({channel_messages: channel_messages})
    })
  }

  // when we get a new message, send it to the server
  // this will be called from the ChatBar component when a user presses the enter key.
  onNewMessage = function onNewMessage(content) {
    // Send the msg object as a JSON-formatted string.
    this.socket.emit("chat.postmessage", {
      channel: this.state.channels[0].id, // TODO should use the selected channel or userid.
      user: this.state.currentUser.id,
      name: this.state.currentUser.name,
      avatar: this.state.currentUser.profile.image_24, // TODO rationalize and simplify the avatar to single image for us
      text: content
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
                messages={this.state.messages}
                onNewMessage={this.onNewMessage}
              />
              <Map slapMap={this.state.slapMap} users={this.state.users} />
            </section>
          )}
        </main>
      </div>
    );
  }
}

export default App;
