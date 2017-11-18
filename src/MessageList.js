import React from 'react';
import Message from './Message.js';
import ChatBar from './ChatBar.js';

function MessageList({messages, onNewMessage}){
  console.log(onNewMessage)
  return (
    <section className="message-interface">
      <div className="messages-container">
        {
          messages.map(message => {
            return <Message key={ message.id } message={ message } />
          })
        }
      </div>
      <ChatBar onNewMessage={onNewMessage} />
    </section>
  ) 
}

export default MessageList
