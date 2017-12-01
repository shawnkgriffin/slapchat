# Functional Specification
slapChat (slack + maps) is a program that integrates the best of slack with maps (SLAP). 

# System Architecture
All communication is by web sockets. 
State changes are sent by each client to the server. 
![System Layout](https://github.com/shawnkgriffin/slapchat/blob/master/docs/slap%20system.png "System Layout")
## State Description
Each client manages it's own state. The state consists of the following major components
* Map
  * Users - [{name, current_location, avatar}]
  * Markers - {location, description, title, icon, picture}
  * Circles - {location, radius, description, title, icon, picture}
  * Polygons - array of locations, description, title, icon, picture}
  * Layers - {name, [markers], [circles], [polygons]}
* Users
  * {Name, avatar} 
* Chat
  * channels - {name, channel_id, [messages]}
  * direct messages - {user_id1, userid2, [messages]}

## Client 
- [ ] Android - React Native
- [ ] iOS - React Native
- [X] Web - React

## Server 
- [X] Express Server
- [ ] Redux - state machine management (stretch)

## Database 
 - [X] Postgres 
 - [ ] PostgresGIS (stretch)


## Chat Features (Core)
- [X] Channels - display, select, read, update
- [X] Messages - Messages sent on a channel or 1-1 are only visible on that channel. 
- [X] Direct messages (1-1) - display, select, read,  update
- [ ] Notifications
- [X] User avatar
- [ ] URL display with link to click
- [ ] png, jpg, gif display with link to click
- [ ] emoticons
- [X] Real time updates
- [ ] Search functionality
- [ ] Tags, keywords & @mentions
- [ ] User changes in name, avatar or status are immediately reflected in all clients
- [X] Notifications are styled differently from chat messages
- [X] User status (logged in or not) is shown in the sidebar.
- [X] Messages sent when user is logged off are stored for later retrieval
 

 ## Chat Features (stretch)
 - [ ] Audio / video conferencing
 - [ ] Two-way audio & video
 - [ ] 1:1 and group calls
 - [ ] Integration with tools and apps
 - [ ] File Sharing
 - [ ] Personalized profiles
 - [ ] Drag & drop interface
 - [ ] Collaborative workspace
 - [ ] Real time notifications
 - [ ] Support for private groups and 1:1 direct messaging
 - [ ] Deep, Contextual Search
 - [ ] Always In Sync
 - [ ] Integrate with Slack API
 - [ ] Conferencing
 - [ ] Contextual search
 - [ ] Indexing
 - [ ] '@mentions'
 - [ ] Private text chat
 - [ ] Collaboration tools
 - [ ] Video support
 - [ ] Call sharing
 - [ ] File transfer
 - [ ] Archiving & retention
 - [ ] Document indexing
 - [ ] Mobile integration
 - [ ] Email notifications
 - [ ] Communication management
 - [ ] Commenting
 - [ ] Authentication & security
 - [ ] Single sign on
 - [ ] Compliance management
 - [ ] Real time data
 - [ ] Screen sharing
 - [ ] Document imaging
 - [ ] Tagging
 - [ ] Channel management
 - [ ] Full text search
 - [ ] Activity logging
 - [ ] Activity tracking
 - [ ] Workflow management
 - [ ] Contact history
 - [ ] Business intelligence
 - [ ] API availability

 ## Map Features
 ### Users
 - [X] User location is tracked and sent by the client to the server. 
 - [X] All users can see the location of any active user on their map.
 - [X] When a user moves, the client will dynamically update the location on the map. 
 - [X] For demonstration and testing, a bot updates the user positions
 - [X] For demonstration and testing, a bot can send alerts
 - [ ] For demonstration and testing, a bot can reply to message
 ### Map
- [ ] users can see a list of the available layers
- [ ] users can view a layer
- [ ] a layer can contain manymarkers
- [ ] users can createmarkers
- [ ] users can editmarkers
- [ ] each marker can have: a title, description, and image
- [ ] the icons formarkers are customizable
- [X] a layer can contain many circles
- [x] users can create circles
- [ ] users can edit circles
- [X] a layer can contain many polygons (including triangle, rectangle...)
- [ ] users can create polygons
- [ ] users can edit polygons
- [ ] users can create layers
- [ ] users can modify layers (add, edit, remove points)
- [ ] users can favourite a layer
- [ ] users have profiles, indicating layers they've contributed to
- [ ] users have profiles, indicating their favourite layers 
- [X] use http://leafletjs.com/ or https://developers.google.com/maps/
- [ ] users can toggle layers on/off by a side panel on the display.

## Extensions:
- [ ] Using redux, history can be rolled back to any point for a client. 
- [ ] add unit tests (using mocha + chai)
- [ ] add end-to-end tests (using phantomjs)
- [ ] document using jsdocs.
- [X] Use Jira to manage project.

## Behaviour Requirements
- [X] When any connected user sends a chat message, all connected users receive and display the message
- [ ] When any connected user changes their name, all connected users are notified of the name change
## Technical Specifications
### Stack:

- [X] Webpack with Babel, JSX, ES6, webpack dev server (comes with boilerplate)
- [X] WebSockets using Node package ws on the server-side, and native WebSocket on client side
- [X] ReactJS
- [ ] React Native
- [ ] Redux

### React component guidelines:

- [X] A single root component (e.g. App) should be responsible for the main application state, as well as communication with the WebSocket server
- [X] A message list component renders the chat log (chat messages and system notifications)
- [X] A chat bar component provides an input field for changing your username and an input field for sending messages. These input fields do not need to be React-style "controlled inputs", although they can be.
### Client websocket behaviour:

- [X] opens a websocket connection as soon as the App component is mounted
- [X] the connection stays open until the client closes the page (or otherwise disconnects)
- [X] sends chat messages and (name change) notifications initiated by the current user
- [X] handles broadcast messages (chat, notifications, user count) from the server and may alter state accordingly
### Websocket server specs:

- [X] The Chatty client app and Chatty websocket server are separate Node apps each with their own package.json
- [X] It's a simple server using express and sockets.io
- [X] The server should send and receive JSON-encoded messages
#### When a client sends a message:
- [X] the server should determine what to do based on the message's type property
- [ ] it should construct a message to send back in response with a corresponding type and a generated unique id (e.g. a UUID)
- [X] When a client connects or disconnects, the server should broadcast the current user count to all connected clients
