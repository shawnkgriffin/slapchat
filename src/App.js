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
import Footer from "./Footer.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      messages: [],
      channels: [],
      loading: true
    };
  }

  //RECIVES STATE DATA
  componentDidMount() {
    this.socket = io("localhost:3001");
    this.socket.on("state", slapState => {
      this.setState({ ...slapState, loading: false });
    });
  }

  render() {
    console.log("SLAPSTATE", this.state);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to SlapChat</h1>
        </header>
        <NavBar />
        {this.state.loading ? (
          <div>Loading</div>
        ) : (
          <div>
            <Channels channels={this.state.channels} />
            <Users users={this.state.users} />
            <MessageList messages={this.state.messages} />
            <ChatBar />
            <Map />
          </div>
        )}

        <Footer />
      </div>
    );
  }
}

export default App;
