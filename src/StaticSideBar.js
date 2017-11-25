import React, { Component } from "react";
import Users from "./Users.js";
import Channels from "./Channels.js";
import UserInfo from "./UserInfo.js";

class StaticSideBar extends Component {
  handleLogout(event) {
    localStorage.clear();
  }
  render() {
    return (
      <div className="side-bar">
        <form method="GET" action="/">
          <button type="submit" onClick={this.handleLogout}>
            logout
          </button>
        </form>
        <UserInfo currentUser={this.props.currentUser} />
        <div className="side-bar-nav">
          <section className="channels">
            <span className="side-bar-section-header">Channels</span>
            <Channels
              onChannelCallback={this.props.onChannelCallback}
              channels={this.props.channels}
              activeChannelId={this.props.activeChannelId}
              activeUserId={this.props.activeUserId}
            />
          </section>
          <section className="direct-messsages">
            <span className="side-bar-section-header">Direct Messages</span>
            <Users
              onUserCallback={this.props.onUserCallback}
              users={this.props.users}
              activeUserId={this.props.activeUserId}
              currentUser={this.props.currentUser}
            />
          </section>
        </div>
      </div>
    );
  }
}

export default StaticSideBar;
