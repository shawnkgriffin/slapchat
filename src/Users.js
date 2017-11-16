import React from "react";
import User from "./User.js";


function Users({users}){
  return (
    <div>
        {
          users.map(user => {
            return <User user={ user }/>
          })
        }
    </div>
  );
}

export default Users;