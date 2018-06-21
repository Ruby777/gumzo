import React, { Component } from 'react';
import './../styles/MessageList.css';
import Moment from 'react-moment';
import 'moment-timezone';
//import { format, formatDistance, formatRelative, subDays } from 'date-fns';


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

    // formatDate(timestamp){
    //   var day = moment.unix(timestamp);
    // }

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
          console.log(message)
          return (

            <div id={`message-${message.key}`} className="messageListMsg" data-message-id={message.key} key={i}>
                <span className="userName">Username: {message.username}</span>
                <br />
                <span className="sentAt">
                  Sent At:
                  <Moment format="DD-MM-YYYY HH:mm">{message.sentAt}</Moment>
                </span>
                <br />
                <span className="content">Content: {message.content}</span>
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
              <span className="roomName">Active Room: {this.props.activeRoom ? this.props.activeRoom.name : ''}</span>
            </div>
            <div className="messageList" >{this.roomMessages()}</div>
            <form className="content" onSubmit={(e) => {e.preventDefault(); this.createNewMessage()}}>
                <input
                  className="msgInput"
                  type="text"
                  placeholder="Type Message Here"
                  value={this.state.content}
                  onChange={(e) => this.handleNewMessage(e)} />
                  <button>Send</button>
            </form>
         </div>
        ) : null
      );
    }
};


export default MessageList;
