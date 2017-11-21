import React from "react";

function User({ user, onUserCallback }) {
  return (
    <li
      className="user list-group-item"
      onClick={userState => onUserCallback(user, userState)}
    >
      <img
        className="direct-message-list-avatar"
        src={user.avatar}
        alt=""
        style={{ width: 24, height: 24 }}
      />
      <span className="user-username">{user.display_name}</span>
    </li>
  );
}

export default User;
