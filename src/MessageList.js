import React from "react";
import Message from "./Message.js";
import ChatBar from "./ChatBar.js";

function MessageList({ messages, onNewMessage }) {
  return (
    <section className="message-interface">
      <div id="messages-container" className="messages-container">
        {messages.map(message => {
          return <Message key={Math.random() * 10000000} message={message} />;
        })}
      </div>
      <ChatBar onNewMessage={onNewMessage} />
    </section>
  );
}

export default MessageList;
