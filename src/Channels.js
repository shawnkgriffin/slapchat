import React from "react";
import Channel from "./Channel.js";

function Channels({ channels, onChannelCallback }) {
  return (
    <ul className="list-group">
      {channels.map(channel => {
        return (
          <Channel
            onChannelCallback={onChannelCallback}
            key={channel.id}
            channel={channel}
          />
        );
      })}
    </ul>
  );
}

export default Channels;
