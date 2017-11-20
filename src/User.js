import React from "react";

function User({ user }) {
  return (
    <li className="user list-group-item">
      <img
        className="Avatar test2"
        src={user.profile.image_24}
        alt=""
        style={{ width: 24, height: 24 }}
      />
      <span className="user-username">{user.name}</span>
      <span className="user-content">{user.text}</span>
    </li>
  );
}

export default User;
