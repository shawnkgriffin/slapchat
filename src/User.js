import React from "react";

function User({ user }) {
  return (
    <div className="user list-group-item">
      <img
        className="Avatar test2"
        src={user.avatar}
        alt={user.display_name}
        style={{ width: 24, height: 24 }}
      />
      <span className="user-username">{user.display_name}</span>
    </div>
  );
}

export default User;
