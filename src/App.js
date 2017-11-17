import React, { Component } from 'react';
import io from 'socket.io-client'
import Map from './Map.js'
import MessageList from './MessageList.js'
import SideBar from './SideBar.js'
import NavBar from './NavBar.js'

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
  onNewMessage = function onNewMessage(content) {
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
      <div className="fixed-container">
        <SideBar 
          users={this.state.users}
          channels={this.state.channels}
        />
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
            <Map />
          </section>
        )}
        </main>
      </div>
    );
  }
}

export default App;
