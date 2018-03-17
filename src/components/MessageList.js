import React, { Component } from 'react';


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
      <div className="messageListMsg" key={i}>
          <span className="userName">Username: {message.username}</span>
          <br />
          <span className="sentAt">Sent At: {message.sentAt}</span>
          <br />
          <span className="content">Content: {message.content}</span>
      </div>
    );
  });

  return mappingFilteredMessages; 
}


    render(){
          return(
             <div className="messageContainer">
                <div className="messagesHeader">
                  <span className="roomName">Active Room: {this.props.activeRoom ? this.props.activeRoom.name : ''}</span>
                </div>
                <div className="messageList" >{this.roomMessages()}</div>
             </div>
          );
    }
};



export default MessageList;
