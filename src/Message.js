import React from "react";

function Message({ message }) {
  return (
    <div className="message">
      <div className="left-of-message">
        <img className="avatar" src={message.avatar} alt={message.name} />
      </div>
      <div className="message-info-and-content">
        <div className="message-info">
          <span className="message-username">{message.name}</span>
          <span className="message-time">4:21</span>
        </div>
        <span className="message-content">{message.text}</span>
      </div>
    </div>
  );
}

export default Message;
