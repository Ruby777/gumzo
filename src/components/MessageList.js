import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
       messages:''
    }


    this.messagesRef = this.props.firebase.database().ref('messages');
   }

    componentDidMount() {
      this.messagesRef.on('child_added', snapshot => {
        console.log(snapshot);
        const message = snapshot.val();
        message.key = snapshot.key;
        this.setState({ messages: this.state.messages.concat( message ) })
      });








export default MessageList;
