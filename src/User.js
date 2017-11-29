import React from "react";

function User({ user, onUserCallback, activeUserId, login_users }) {
  let isLoggedIn = false;
  const isActive = activeUserId === user.id ? "active-user" : "";
  const userClass = `user list-group-item ${isActive}`;

  login_users.forEach(login_id => {
    if (login_id === user.id) {
      isLoggedIn = true;
    }
  });
  return (
    <li
      className={userClass}
      onClick={userState => onUserCallback(user, userState)}
    >
      {isLoggedIn ? (
        <span className="online-icon">
          <i className="fa fa-circle" aria-hidden="true" />
        </span>
      ) : (
        <span className="offline-icon">
          <i className="fa fa-circle-o" aria-hidden="true" />
        </span>
      )}
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
