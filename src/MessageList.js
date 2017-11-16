import React from 'react';
import Message from './Message.js';


function MessageList({messages}){
  return (
    <div>
      {
        messages.map(message => {
          return <Message message={ message } />
        })
      }
    </div>
  ) 
}
  


  


export default MessageList
