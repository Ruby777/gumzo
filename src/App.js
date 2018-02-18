import React, { Component } from 'react';
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
  constructor(props){
    super(props)

    this.state = {
   
       activeRoom:"",
       activeRoomName:""
    };
  }

    setActiveRoom(room) {
      this.setState({ activeRoom: room.key });
      this.setState({ activeRoomName: room.name });
    }


  render() {
    return (
      <section className="App">
        <header className="App-header">
        </header>
        <p className="App-title">Bloc Chat</p>
        <div className="App-roomlist">
            <RoomList firebase={firebase}
            activeRoom = {this.state.activeRoom}
            setActiveRoom ={(room) => this.setActiveRoom(room)} />
        </div>
        <div className="App-messagelist">
            <MessageList firebase={firebase}
            activeRoom = {this.state.activeRoom}
            activeRoomName ={this.state.activeRoomName} />
        </div>
      </section>
    );
  }
}

export default App;
