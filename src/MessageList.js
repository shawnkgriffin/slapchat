import React from 'react';
import Message from './Message.js';


function MessageList({messages}){
  return (
    <div>
      {
        messages.map(message => {
          return <Message    key={message.id} message={ message } />
        })
      }
    </div>
  ) 
}
  


  


export default MessageList
