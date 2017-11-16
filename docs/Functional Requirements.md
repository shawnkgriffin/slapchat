# Functional Requirements
slap (slack + maps) is a program that integrates the best of slack with the ability to share locations on a map. 

# System Architecture
The system uses redux to manage the state of both the server and the client.
All communication is by web sockets. 
State changes are sent by each client to the server. The server updates it's internal state using redux. The server will either send the message to all clients or it will send the updated state (tbd).
![System Layout](https://github.com/shawnkgriffin/slap/blob/master/docs/slap%20system.png "System Layout")
## State Description
Each client manages it's own state using redux and simple middleware. The state consists of the following major components
* Map
  * Users - [{name, current_location, avatar}]
  * Pins - {location, description, title, icon, picture}
  * Circles - {location, radius, description, title, icon, picture}
  * Polygons - array of locations, description, title, icon, picture}
  * Layers - {name, [pins], [circles], [polygons]}
* Users
  * {Name, avatar} 
* Chat
  * Messages - {originator, text, [images], [uris]}
  * channels - {name, channel_id, [messages]}
  * direct messages - {user_id1, userid2, [messages]}

## Client 
- [ ] Android - React Native
- [ ] iOS - React Native
- [ ] Web - React
- [ ] Redux - state machine management for all client environments.

## Server 
- [ ] Express Server
- [ ] Redux - state machine management (stretch)

## Database 
 - [ ] Mongo DB


## Chat Features (Core)
- [ ] Conversation - display, select, read, create, update, delete
- [ ] Channel - display, select, read, create, update, delete
- [ ] Conversations - Messages sent on a channel or 1-1 are only visible on that channel. 
- [ ] Direct messages (1-1) - display, select, read, create, update, delete
- [ ] Notifications
- [ ] User avatar
- [ ] URL display with link to click
- [ ] png, jpg, gif display with link to click
- [ ] emoticons
- [ ] Real time updates
- [ ] Search functionality
- [ ] Tags, keywords & @mentions
- [ ] User changes in name, avatar or status are immediately reflected in all clients
- [ ] Notifications are styled differently from chat messages
- [ ] Header will display the count of connected users
- [ ] When the number of connected users changes, this count will be updated for all connected users
 

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
 - [ ] User location is tracked and sent by the client to the server. 
 - [ ] All users can see the location of any active user on their map.
 - [ ] When a user moves, the client will dynamically update the location on the map. 
 ### Map
- [ ] users can see a list of the available layers
- [ ] users can view a layer
- [ ] a layer can contain many pins
- [ ] users can create pins
- [ ] users can edit pins
- [ ] each pin can have: a title, description, and image
- [ ] the icons for pins are customizable
- [ ] a layer can contain many circles
- [ ] users can create circles
- [ ] users can edit circles
- [ ] a layer can contain many polygons (including triangle, rectangle...)
- [ ] users can create polygons
- [ ] users can edit polygons
- [ ] users can create maps
- [ ] users can modify maps (add, edit, remove points)
- [ ] users can favourite a layer
- [ ] users have profiles, indicating their favourite maps and maps they've contributed to
- [ ] use http://leafletjs.com/ or https://developers.google.com/maps/
- [ ] users can toggle maps on/off by a side panel on the display.

## Extensions:
- [ ] Using redux, history can be rolled back to any point for a client. 
- [ ] Using redux, history can be rolled back to any point for the server. 
- [ ] add unit tests (using mocha + chai)
- [ ] add end-to-end tests (using phantomjs)
- [ ] document using jsdocs.
- [ ] Use Jira to manage project.

## Behaviour Requirements
- [ ] When any connected user sends a chat message, all connected users receive and display the message
- [ ] When any connected user changes their name, all connected users are notified of the name change
  - [ ] Notifications are styled differently from chat messages
- [ ] Header will display the count of connected users
- [ ] When the number of connected users changes, this count will be updated for all connected users
- [ ] (STRETCH) Different users' names will each be coloured differently
- [ ] Bonus: the colouring is consistent between connected user instances 
- [ ] or is calculated algorithmically based on their name,
- [ ] or is manually selectable by users, or any other interesting approach!
## Technical Specifications
### Stack:

- [ ] Webpack with Babel, JSX, ES6, webpack dev server (comes with boilerplate)
- [ ] WebSockets using Node package ws on the server-side, and native WebSocket on client side
- [ ] ReactJS
- [ ] React Native
- [ ] Redux

### React component guidelines:

- [ ] A single root component (e.g. App) should be responsible for the main application state, as well as communication with the WebSocket server
- [ ] A message list component renders the chat log (chat messages and system notifications)
- [ ] A chat bar component provides an input field for changing your username and an input field for sending messages. These input fields do not need to be React-style "controlled inputs", although they can be.
### Client websocket behaviour:

- [ ] opens a websocket connection as soon as the App component is mounted
- [ ] the connection stays open until the client closes the page (or otherwise disconnects)
- [ ] sends chat messages and (name change) notifications initiated by the current user
- [ ] handles broadcast messages (chat, notifications, user count) from the server and may alter state accordingly
### Websocket server specs:

- [ ] The Chatty client app and Chatty websocket server are separate Node apps each with their own package.json
- [ ] It's a simple server using express and ws
- [ ] The server should send and receive JSON-encoded messages
#### When a client sends a message:
- [ ] the server should determine what to do based on the message's type property
- [ ] it should construct a message to send back in response with a corresponding type and a generated unique id (e.g. a UUID)
- [ ] When a client connects or disconnects, the server should broadcast the current user count to all connected clients
- [ ] (STRETCH) the server may assign and/or keep track of user colours (there are several ways of solving this)
### Submit Requirements
### Step 1: Verify the project is complete
- [ ] Functional requirements complete
### Step 2: Clean up the code
- [ ] Remove console.logs
- [ ] Add comments
- [ ] Check best practices
- [ ] Correct variable declaration and semi-colon use
- [ ] Proper and consistent indentation and spacing
- [ ] Clear and consistent function and variable names
- [ ] Modular and reusable code (no need to break your code into Node modules, but using helper functions to keep the code DRY is a good idea)
- [ ] Well-commented code (in other words, that your code is easy to read)
- [ ] That no debugging, commented-out or dead/un-used code is present
- [ ] Sensible structure for the project's files and directories
### Step 3: Verify your project will install on your mentors' computers
- [ ] verify that your package.json files include all the necessary dependencies. Yes, that's files plural: You should have a separate package.json file for each of the two server.

- [ ] Open the package.json file in your project's root directory and verify that you've got the following packages listed under the "devDependencies" and/or "dependencies" keys.
* Client 
  * babel-core
  * babel-loader
  * babel-preset-es2015
  * babel-preset-react
  * css-loader
  * node-sass
  * sass-loader
  * sockjs-client
  * style-loader
  * webpack
  * webpack-dev-server
  * react
  * react-dom

* Server
  * express
  * ws
  * uuid

Step 4: Update README file
- [ ] README.md
Step 5: Add screenshots

- [ ] screenshots
- [ ] doc directory
### Step 6: Push the final version to GitHub
- [ ] Push the final version of your Chatty project to GitHub (to the master branch).
### Step 7: Submit the project!
- [ ] Done