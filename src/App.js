import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';



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


  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
      
  firebase.auth().signOut().then(function(){
       // Sign-out successful.
      }).catch(function(error){
       //An error happened.
      });


class App extends Component {
  constructor(props){
    super(props)


    this.state = {
      activeRoom:null,
      currentUser:null
    };
  }

    setActiveRoom(room) {
      this.setState({ activeRoom: room });
    }

    setUser(user){
      this.setState({ currentUser: user });
    }


  render() {
    return (
      <section className="App">
        <header className="App-header">
        </header>
        <p className="App-title">Bloc Chat</p>
        <div className="App-roomlist">
            <RoomList firebase = {firebase}
            activeRoom = {this.state.activeRoom}
            setActiveRoom = {(room) => this.setActiveRoom(room)} 
            setUser = {(user) => this.setUser(user)} />
        </div>
        <div className="App-messagelist">
            <MessageList firebase = {firebase}
            activeRoom = {this.state.activeRoom}
            setActiveRoom = {(room) => this.setActiveRoom(room)} 
            setUser = {(user) => this.setUser(user)} />
        </div>
        <div className="App-user">
            <User firebase = {firebase}
            activeRoom = {this.state.activeRoom}
            setActiveRoom = {(room) => this.setActiveRoom(room)} 
            setUser = {(user) => this.setUser(user)} />
        </div>
      </section>
    );
  }
}

export default App;