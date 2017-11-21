import React from "react";

function Channel({ channel, onChannelCallback }) {
  return (
    <li
      onClick={channelState => onChannelCallback(channel, channelState)}
      className="channel-channelname list-group-item"
    >
      {channel.name}
    </li>
  );
}

export default Channel;
