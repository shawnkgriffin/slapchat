import React, { Component } from "react";

class UserInfo extends Component {
  render() {
    console.log(this.props);
    return (
      <section className="user-info">
        <div>
          <img
            className="user-info-avatar"
            src={this.props.currentUser ? this.props.currentUser.avatar : "?"}
          />
          {this.props.currentUser ? this.props.currentUser.display_name : "?"}
        </div>
        <div />
      </section>
    );
  }
}

export default UserInfo;
