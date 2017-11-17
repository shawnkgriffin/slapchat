import React, { Component } from "react";
import ChatBar from './ChatBar.js'

class MessageList extends Component {
  render() {
    return ( 
      <section className="message-interface">
        <div className="message-container">
          <span>I am the MessageList</span>
        </div>
        <ChatBar />
      </section>
    )
  }
}

export default MessageList
