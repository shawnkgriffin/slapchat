import React, { Component } from "react";
import Users from "./Users.js";
import Channels from "./Channels.js";

class SideBar extends Component {
  render() {

    return (

      <div className="side-bar">
          <ul>
            <li className="user-info">
              USER INFO
            </li>
            <li id="chat-title">
              <p>All chats</p>
            </li>
            <li>
              <ul id="channels">
                <Channels channels={this.props.channels} />
              </ul>
            </li>
            <li>
              <ul id="direct-messages">
                <Users users={this.props.users} />
              </ul>
            </li>
          </ul>
      </div>
    );
  }
}

export default SideBar
