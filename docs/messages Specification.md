# From client
client will do a socket.emit like this...
```
this.socket.emit{"users.get",  {user: user.id} }
this.socket.emit{"channels.get", {user: user.id}}
this.socket.emit{"direct_messages.get", {user: user.id}}
this.socket.emit{"channel_messages.get", {user: user.id}}
this.socket.emit{"channel_messages.post", {user: user.id}}
this.socket.emit("channel_messages.post", {
      user: user.id,
      channel: channelID, 
      text: content
}
this.socket.emit{"user.move", {user: user.id, position: { lat: 50.1116, lng: -122.923411 }}}

```
# Server will send the data after retrieving from the db.  
```
io.socket.emit("users", {users: [user1, user2...]})
io.socket.emit("channels", {channels: [channel1, channel2...]})
io.socket.emit("direct_messages", {direct_messages : [message1, message2...]})
io.socket.emit("channel_messages", {channel_messages: [message1, message2...]})
```
# Client will receive by saying
```
this.socket.on("users", users => {
      this.setState({
        ...slapState,
        loading: false,
        users,
        currentUser: slapState.users[0]
      });

```
