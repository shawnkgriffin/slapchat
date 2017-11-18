import React, { Component } from "react";

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = { content: "" };
    this.onMessageSubmit = this.onMessageSubmit.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
  }

  // onMessageSubmit when the user presses enter on the submit field.
  onMessageSubmit(event) {
    if (event.key === "Enter") {
      this.props.onNewMessage(this.state.content);
      this.setState({ content: "" });
    }
  }

  // need an on change event
  onMessageChange(event) {
    this.setState({ content: event.target.value });
  }

  // Main render
  render() {
    return (
      <div className="chat-bar">
        <input
          id="message-input"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.onMessageSubmit}
          onChange={this.onMessageChange}
          value={this.state.content}
        />
        <button className="btn btn-primary">Send</button>
      </div>
    );
  }
}

export default ChatBar;
