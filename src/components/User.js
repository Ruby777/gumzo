import React, { Component } from 'react';


class User extends Component {

    componentDidMount() {
       this.props.firebase.auth().onAuthStateChanged( user => {
         this.props.setUser(user);
          });  
    }

    
    render() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
        return(
          <div>
              <div>
                <button onClick={this.props.firebase.auth().signInWithPopup( provider )}>Sign In</button>
                <button onClick={this.props.firebase.auth().signOut()}>Sign Out</button>
              </div>
              <div>{this.props.currentUser ? this.props.currentUser.name : "Guest"}</div>
          </div>     
        );
    }
}


export default User;