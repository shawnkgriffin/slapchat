import React, { Component } from "react";

class SideBar extends Component {
  render() {
    

    return (
    <div className="table-responsive col-md-3">
    <table>
      <thead>
        <tr>
          <th className="col-md-1">Avatar</th>
          <th className="col-md-2">User</th>
          <th className="col-md-3">User ID</th>
        </tr>
      </thead>
      <tbody id="users">
      <tr><td>Shawn
            </td><td>was</td><td>here</td></tr>
      </tbody>
    </table>
  </div>
    );
  }
}

export default SideBar
