import React from 'react';
import Channel from './Channel.js';

function Channels({ channels }) {
  return (
    <div className="list-group">
      {channels.map(channel => {
        return <Channel key={channel.id} channel={channel} />;
      })}
    </div>
  );
}

export default Channels;
