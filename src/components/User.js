import React, { Component } from 'react';


class User extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
       this.props.firebase.auth().onAuthStateChanged( user => {  
           this.props.setUser(user);       
          });  
    }


    render() {
        
        return(
          <div> 
              <div>
                <button type="button" onClick={()=>this.props.firebaseSignIn()}>Sign In</button>
                <button type="button" onClick={()=>this.props.firebaseSignOut()}>Sign Out</button>
              </div>
              <div>
              {this.props.currentUser ? this.props.currentUser.displayName : "Guest"}</div>
          </div>     
        );
    }
}

export default User;