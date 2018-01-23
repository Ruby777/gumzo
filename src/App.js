import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA7G4uT-hqZ-hftan2bPXct3UU8mwBKns4",
    authDomain: "react-chat-room-5d397.firebaseapp.com",
    databaseURL: "https://react-chat-room-5d397.firebaseio.com",
    projectId: "react-chat-room-5d397",
    storageBucket: "react-chat-room-5d397.appspot.com",
    messagingSenderId: "797104072210"
  };
  firebase.initializeApp(config);

class App extends Component {
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
         <div className="roomslist">
                <RoomList />
                <MessageList />
         </div>
      </div>
    );
  }
}

export default App;
