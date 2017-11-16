import React, { Component } from "react";
import ChatBar from './ChatBar.js'

class MessageList extends Component {
  render() {
    return ( 
      <div className="MessageList container col-6">
        <main>
          <span>I am the MessageList</span>
        </main>
        <footer>
          <ChatBar />
        </footer>
      </div>
    )
  }
}

export default MessageList
