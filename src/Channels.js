import React from "react";
import Channel from "./Channel.js";

function Channels({
  channels,
  onChannelCallback,
  activeUserId,
  activeChannelId
}) {
  return (
    <ul className="list-group">
      {channels.map(channel => {
        return (
          <Channel
            onChannelCallback={onChannelCallback}
            key={channel.id}
            channel={channel}
            activeChannelId={activeChannelId}
            activeUserId={activeUserId}
          />
        );
      })}
    </ul>
  );
}

export default Channels;
