import React, { Component } from "react";

class UserInfo extends Component {
  render() {
    return (
      <section className="user-info">
        <img
          className="user-info-avatar"
          alt=""
          src={this.props.currentUser ? this.props.currentUser.avatar : "?"}
        />
        <div className="user-info-content">
          {this.props.currentUser ? this.props.currentUser.display_name : "?"}
          <form method="GET" action="/">
            <button
              className="logout-button btn btn-primary btn-sm"
              type="submit"
              onClick={this.props.handleLogout}
            >
              Logout
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default UserInfo;
