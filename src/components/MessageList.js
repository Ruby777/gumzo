import React, { Component } from 'react';
import RoomList from './RoomList.js';

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

  let messages = this.state.messages;
  let activeRoom = this.props.activeRoom;
  let filteredMessages = messages.filter( message => (message.roomId === this.props.activeRoom));
  let mappingFilteredMessages = filteredMessages.map((message, i) =>
    <div className="messageListMsg" key={i}>
        <span className="userName">{message.username}</span>
        <span className="sentAt">{message.sentAt}</span>
        <span className="content">{message.content}</span>
    </div>
    );
  return mappingFilteredMessages;

}

    render(){
          return(
             <div className="messageContainer">
                <div className="messagesHeader">
                  <span className="roomName">{this.props.activeRoom}</span>
                </div>
                <div className="messageList">{this.roomMessages()}</div>
             </div>
          );
    }
};





export default MessageList;
