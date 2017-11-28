import React from "react";
import User from "./User.js";

function Users({
  users,
  onUserCallback,
  currentUser,
  activeUserId,
  login_users
}) {
  return (
    <ul className="list-group">
      {users.filter(user => user.id !== currentUser.id).map(user => {
        return (
          <User
            onUserCallback={onUserCallback}
            key={user.id}
            user={user}
            activeUserId={activeUserId}
            login_users={login_users}
          />
        );
      })}
    </ul>
  );
}

export default Users;
