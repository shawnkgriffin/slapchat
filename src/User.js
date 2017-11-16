import React from "react";

function User({ user }) {
  return (
    <div className="user">
      <span className="user-avatar">{user.avatar}</span>
      <span className="user-username">{user.name}</span>
      <span className="user-content">{user.text}</span>
    </div>
  );
}

export default User;
