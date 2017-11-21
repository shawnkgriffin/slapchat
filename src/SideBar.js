import React, { Component } from "react";
import Users from "./Users.js";
import Channels from "./Channels.js";
import UserInfo from "./UserInfo.js";

class SideBar extends Component {
  render() {
    return (
      <div className="side-bar">
        <UserInfo currentUser={this.props.currentUser} />
        <div className="side-bar-nav">
          <section className="channels">
            <span className="side-bar-section-header">Channels</span>
            <Channels
              onChannelCallback={this.props.onChannelCallback}
              channels={this.props.channels}
            />
          </section>
          <section className="direct-messsages">
            <span className="side-bar-section-header">Direct Messages</span>
            <Users
              onUserCallback={this.props.onUserCallback}
              users={this.props.users}
            />
          </section>
        </div>
      </div>
    );
  }
}

export default SideBar;
