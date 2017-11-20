import React, { Component } from "react";
import Users from "./Users.js";
import Channels from "./Channels.js";

class SideBar extends Component {
  render() {
    return (
      <div className="side-bar">
        <div className="user-info">
          <p>User info content</p>
        </div>
        <div className="side-bar-nav">
          <section className="channels">
            <span>Channels</span>
            <Channels channels={this.props.channels} />
          </section>
          <section className="direct-messsages">
            <span>Direct Messages</span>
            <Users users={this.props.users} />
          </section>
        </div>
      </div>
    );
  }
}

export default SideBar;
