import React from "react";
import User from "./User.js";

function Users({ users }) {
  return (
    <ul className="list-group">
      {users.map(user => {
        return <User key={user.id} user={user} />;
      })}
    </ul>
  );
}

export default Users;
