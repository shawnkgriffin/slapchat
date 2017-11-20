import React from "react";

function Message({ message }) {
  return (
    <div className="message">
      <div className="left-of-message">
        <img
          className="message-avatar"
          src={message.avatar}
          alt={message.display_name}
        />
      </div>
      <div className="message-info-and-content">
        <div className="message-info">
          <span className="message-username">{message.display_name}</span>
          <span className="message-time">4:21</span>
        </div>
        <span className="message-content">{message.content}</span>
      </div>
    </div>
  );
}

export default Message;
