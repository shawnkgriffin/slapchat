import React, { Component } from "react";

class UserInfo extends Component {
  render() {
    return (
      <section className="user-info">
        <div>
          <img
            className="user-info-avatar"
            alt=""
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
