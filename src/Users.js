import React from "react";
import User from "./User.js";

function Users({ users, onUserCallback, currentUser }) {
  return (
    <ul className="list-group">
      {users.filter(user => user.id != currentUser.id).map(user => {
        return (
          <User onUserCallback={onUserCallback} key={user.id} user={user} />
        );
      })}
    </ul>
  );
}

export default Users;
