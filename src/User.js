import React from "react";

function User({ user, onUserCallback, activeUserId }) {
  const isActive = activeUserId === user.id ? "active-user" : "";
  const userClass = `user list-group-item ${isActive}`;
  return (
    <li
      className={userClass}
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
