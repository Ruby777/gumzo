import React, { Component } from 'react';
import './../styles/MessageList.css';
import Moment from 'react-moment';
import 'moment-timezone';



class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
          messages:[],
            username: "",
            content: "",
            sentAt: "",
            roomId: ""
       };

    this.messagesRef = this.props.firebase.database().ref('messages');
    //this.messagesRef = this.messagesRef.orderBy("roomId").equalTo(this.props.activeRoom);
   }

   componentDidMount() {
      this.messagesRef.on('child_added', snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        this.setState({ messages: this.state.messages.concat( message ) });
      });
    }


    roomMessages() {
        
        if (!this.props.activeRoom) {
          return;
        }

        let messages = this.state.messages;
        let activeRoom = this.props.activeRoom;
        let filteredMessages = messages.filter( message => {
          return message.roomId === activeRoom.key;
        });

        let mappingFilteredMessages = filteredMessages.map((message, i) => {
          return (
            <div id={`message-${message.key}`} className="messageListMsg" data-message-id={message.key} key={i}>
                <span className="userName"> {message.username}</span>
                <span className="sentAt">
                  <Moment format="DD-MM-YYYY HH:mm">{message.sentAt}</Moment>
                </span>
                <br />
                <span className="content">{message.content}</span>
                <br />
                <hr />
            </div>  
          );
        });

        return mappingFilteredMessages; 
      }

    handleNewMessage(e) { 
      let newMessage = e.target.value;
      this.setState({content: newMessage});
    }
    
    createNewMessage() {
      if (!this.props.activeRoom) {
        window.alert("Select a room first");
        return;
      }
    
      let messageObject = {
        
        content: this.state.content,
        username: this.props.currentUser.displayName,
        roomId: this.props.activeRoom.key,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
      };

      this.messagesRef.push(messageObject);
      this.setState({content: ""});
        
    }

 render(){
      return(
        this.props.currentUser ?
        (
        <div className="messageContainer">
            <div className="messagesHeader">
            <br />
              <span className="roomName">Active Room: {this.props.activeRoom ? this.props.activeRoom.name : ''}</span>
            <br />
            </div>
            <div className="messageList" >{this.roomMessages()}</div>
            <form className="content" onSubmit={(e) => {e.preventDefault(); this.createNewMessage()}}>
                <input
                  className="msgInput"
                  type="text"
                  placeholder="Type Message Here"
                  value={this.state.content}
                  onChange={(e) => this.handleNewMessage(e)} />
                  <button class="send">Send</button>
            </form>
         </div>
        ) : <h3 class="welcome">Hi, Welcome to Gumzo (pronounced "Gooh-m-zo")! Please log in to continue.</h3>
      );
    }
};


export default MessageList;
