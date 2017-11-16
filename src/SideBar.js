import React, { Component } from "react";

class SideBar extends Component {
  render() {
    

    return (
    // <div className="table-responsive col-md-3">
    // <table>
    //   <thead>
    //     <tr>
    //       <th className="col-md-1">Avatar</th>
    //       <th className="col-md-2">User</th>
    //       <th className="col-md-3">User ID</th>
    //     </tr>
    //   </thead>
    //   <tbody id="users">
    //   <tr><td>Finn
    //         </td><td>was</td><td>here</td></tr>
    //   </tbody>
    // </table>
  // </div>

      <div className="SideBar container col-md-3">
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
