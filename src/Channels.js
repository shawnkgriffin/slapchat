import React from "react";
import Channel from "./Channel.js";


function Channels({channels}){
  return (
    <div>
        {
          channels.map(channel => {
            return <Channel channel={ channel }/>
          })
        }
    </div>
  );
}

export default Channels;