import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client'
import Map from './Map.js'
import MessageList from './MessageList.js'
import SideBar from './SideBar.js'
import NavBar from './NavBar.js'



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {slapState: {}};
  };

  //RECIVES STATE DATA 
  componentDidMount() {
    this.socket = io('localhost:3001');
    this.socket.on('state', (slapState) => {
      this.setState({slapState});
    })
  };

  render() {
    return (
      <div className="App container-fluid row">
          <SideBar users = {this.state.slapState.users}/>
          <main id="main-section" className="row container-fluid col-8">
            <NavBar />
            <MessageList />
            <Map />
          </main>
      </div>
    );
  }
}

export default App;
