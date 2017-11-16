import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'

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
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
