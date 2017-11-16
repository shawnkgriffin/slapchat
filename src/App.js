import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'
import Map from './Map.js'
import MessageList from './MessageList.js'
import SideBar from './SideBar.js'
import ChatBar from './ChatBar.js'
import NavBar from './NavBar.js'
import Footer from './Footer.js'



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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to SlapChat</h1>
          <NavBar />  
      </header>
        <SideBar users = {this.state.slapState.users}/>
        <MessageList />
        <div className="MapContainer">
          <Map className="Map"
            containerElement={<div style={{height:100+'%', width:100+'%'}} />}
            mapElement={<div style={{height:100+'%', width:100+'%'}} />}
          />
        </div>
        <ChatBar />
        <Footer />
      </div>
    );
  }
}

export default App;
