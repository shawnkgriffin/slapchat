import React, { Component } from "react";

class ChatBar extends Component {
  render() {
    return (
      <div className="ChatBar container-fluid">
        <input id="message-input" placeholder="Message">
        </input>
        <button>Send</button>
      </div>
    )
  }
}

export default ChatBar
