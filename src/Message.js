import React from "react";

function Message({message}){
    return( 
    <div>
        <div className="message">
            <span className="message-avatar">{message.avatar}</span>
            <span className="message-username">{message.name}</span>
            <span className="message-content">{message.text}</span>
        </div>
    </div>
    );
};

export default Message;
