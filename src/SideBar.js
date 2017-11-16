import React, { Component } from "react";

class SideBar extends Component {
  render() {

    return (

      <div className="SideBar container col-4">
          <ul>
            <li className="user-info">
              USER INFO
            </li>
            <li id="chat-title">
              <p>All chats</p>
            </li>
            <li>
              <ul id="channels">
                <li>Patrol Team 1</li>
                <li>Patrol Team 2</li>
                <li>Patrol Team 3</li>
                <li>Patrol Team 4</li>
                <li>Patrol Team 5</li>
                <li>Patrol Team 6</li>
              </ul>
            </li>
            <li>
              <ul id="direct-messages">
                <li>User</li>
                <li>User</li>
                <li>User</li>
                <li>User</li>
                <li>User</li>
                <li>User</li>
              </ul>
            </li>
          </ul>
      </div>
    );
  }
}

export default SideBar
