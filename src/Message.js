import React from "react";

function Message({ message }) {
  return (
    <div className="message">
      <img
        className="Avatar test2"
        src={message.avatar}
        alt={message.display_name}
        style={{ width: 24, height: 24 }}
      />
      <span className="message-username">{message.display_name}</span>
      <span className="message-content">{message.content}</span>
    </div>
  );
}

export default Message;
