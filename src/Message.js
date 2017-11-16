import React from "react";

function Message({ message }) {
  return (
    <div className="message">
      <span className="message-avatar">{message.avatar}</span>
      <span className="message-username">{message.name}</span>
      <span className="message-content">{message.text}</span>
    </div>
  );
}

export default Message;
