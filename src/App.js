import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";
import Map from "./Map.js";
import MessageList from "./MessageList.js";
import Users from "./Users.js";
import ChatBar from "./ChatBar.js";
import Channels from "./Channels.js";
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
  }

  // when we get a new message, send it to the server
  // this will be called from the ChatBar component when a user presses the enter key.
  onNewMessage(content) {
    // Send the msg object as a JSON-formatted string.
    this.socket.emit("chat.postmessage", {
      channel: this.state.channels[0].id, // TODO should use the selected channel or userid.
      user: this.state.currentUser.id,
      name: this.state.currentUser.name,
      avatar: this.state.currentUser.profile.image_24, // TODO rationalize and simplify the avatar to single image for us
      text: content
    });
  }

  render() {
    console.log("SLAPSTATE", this.state);
    return (
      <div className="App">
        <NavBar />
        {this.state.loading ? (
          <div>Loading</div>
        ) : (
          <div>
            <div className="MapContainer">
              <Map
                slapMap={this.state.slapMap}
                users={this.state.users}
                className="Map"
                containerElement={
                  <div style={{ height: 100 + "%", width: 100 + "%" }} />
                }
                mapElement={
                  <div style={{ height: 100 + "%", width: 100 + "%" }} />
                }
              />
            </div>
            <Channels channels={this.state.channels} />
            <Users users={this.state.users} />
            <MessageList messages={this.state.messages} />
            <ChatBar onNewMessage={this.onNewMessage} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
