import React from "react";
import User from "./User.js";

function Users({ users }) {
  return (
    <div className="list-group">
      {users.map(user => {
        return <User key={user.id} user={user} />;
      })}
    </div>
  );
}

export default Users;
