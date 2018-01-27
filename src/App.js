import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';


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
      <section className="App">
        <header className="App-header">
        </header>
        <p className="App-title">Bloc Chat</p>
        <div className="App-roomlist">  
            <RoomList firebase={firebase} />
        </div>
      </section>
    );
  }
}

export default App;
