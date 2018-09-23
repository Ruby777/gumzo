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
        
        return (
     
          <div>   
              <div className="signIn">
               {!this.props.currentUser ? 
                <button type="button" onClick={()=>this.props.firebaseSignIn()}>Sign In</button>   
                 : null}
                </div>  
              <div className="signOut"> 
               {this.props.currentUser ? 
                <button type="button" onClick={()=>this.props.firebaseSignOut()}>Sign Out</button>
                : null}
              </div>   
              <br />
              <div className="currentUser">
              {this.props.currentUser ? this.props.currentUser.displayName : "Guest"}</div>
          </div>  
        );
    }
}

export default User;