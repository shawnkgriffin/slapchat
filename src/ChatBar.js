import React, { Component } from "react";

class ChatBar extends Component {
  render() {
    return (
      <div className="chat-bar">
        <input id="message-input" placeholder="Message">
        </input>
        <button>Send</button>
      </div>
    )
  }
}

export default ChatBar
