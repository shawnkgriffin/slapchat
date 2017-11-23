import React from "react";

function Channel({
  channel,
  onChannelCallback,
  activeUserId,
  activeChannelId
}) {
  const isActive = activeChannelId === channel.id ? "active-user" : "";
  const channelClass = `channel-channelname list-group-item ${isActive}`;
  return (
    <li
      onClick={channelState => onChannelCallback(channel, channelState)}
      className={channelClass}
    >
      {channel.name}
    </li>
  );
}

export default Channel;
