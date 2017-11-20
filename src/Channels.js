import React from "react";
import Channel from "./Channel.js";

function Channels({ channels }) {
  return (
    <ul className="list-group">
      {channels.map(channel => {
        return <Channel key={channel.id} channel={channel} />;
      })}
    </ul>
  );
}

export default Channels;
