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

  showSignInForm() {
    //firebase authentication
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    }); 

    // firebase code goes here
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      console.log("you have signed in successfully");
      
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error :" + errorMessage);
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  signingOut(){
    firebase.auth().signOut().then(function(){
      // Sign-out successful.
      console.log("you have signed out successfully");
    }).catch(function(error){
      //An error happened.
   });
}

// timeConvert(){
//   var timestamp = this.firebase.database.ServerValue.TIMESTAMP;
//   var myDate = new Date(timestamp).getTime()
// }


  render() {
    return (
      <section className="App">
        <header className="App-header">
        </header>
        <h2 className="App-title">Bloc Chat</h2>
        <div className="App-roomlist">
            <RoomList firebase = {firebase}
            activeRoom = {this.state.activeRoom}
            setActiveRoom = {(room) => this.setActiveRoom(room)} 
            setUser = {(user) => this.setUser(user)}
            currentUser = {this.state.currentUser} />
        </div>
        <div className="App-messagelist">
            <MessageList firebase = {firebase}
            activeRoom = {this.state.activeRoom}
            setActiveRoom = {(room) => this.setActiveRoom(room)} 
            setUser = {(user) => this.setUser(user)} 
            currentUser = {this.state.currentUser}/>
        </div>
        <div className="App-user">
            <User firebase = {firebase}
            firebaseSignIn = {()=>this.showSignInForm()}
            firebaseSignOut = {()=>this.signingOut()}
            activeRoom = {this.state.activeRoom}
            setActiveRoom = {(room) => this.setActiveRoom(room)} 
            setUser = {(user) => this.setUser(user)}
            currentUser = {this.state.currentUser} />
          </div> 
      </section>
    );
  }
}

export default App;