import React from "react";
import User from "./User.js";

function Users({ users, onUserCallback }) {
  return (
    <ul className="list-group">
      {users.map(user => {
        return (
          <User onUserCallback={onUserCallback} key={user.id} user={user} />
        );
      })}
    </ul>
  );
}

export default Users;
