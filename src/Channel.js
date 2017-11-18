import React from "react";

function Channel({ channel }) {
  return (
    <div className="channel list-group-item">
      <span className="channel-channelname">{channel.name}</span>
    </div>
  );
}

export default Channel;
