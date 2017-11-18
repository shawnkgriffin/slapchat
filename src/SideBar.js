import React, { Component } from "react";
import Users from "./Users.js";
import Channels from "./Channels.js";

class SideBar extends Component {
  render() {

    return (
      <div className="side-bar">
        <div className="user-info">
          USER INFO
        </div>
        <section className="channels">
            <Channels channels={this.props.channels} />
        </section>
        <section className="direct-messsages">
            <Users users={this.props.users} />
        </section>
      </div>
    );
  }
}

export default SideBar
