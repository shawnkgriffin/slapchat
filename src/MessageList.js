import React from "react";
import Message from "./Message.js";
import ChatBar from "./ChatBar.js";

function MessageList({ channel_messages, direct_messages, onNewMessage }) {
  console.log("CHANNEL MESSAFGES", channel_messages);
  return (
    <section className="message-interface">
      <div className="messages-container">
        {channel_messages.map(channel_message => {
          return <Message key={channel_message.id} message={channel_message} />;
        })}
        {direct_messages.map(direct_message => {
          return <Message key={direct_message.id} message={direct_message} />;
        })}
      </div>
      <ChatBar onNewMessage={onNewMessage} />
    </section>
  );
}

export default MessageList;
