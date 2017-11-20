import React from "react";

function Channel({ channel }) {
  return (
    <li className="channel-channelname list-group-item">{channel.name}</li>
  );
}

export default Channel;
