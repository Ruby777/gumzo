import React, { Component } from 'react';



class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        rooms: [],
        roomName:''
      };

   this.roomsRef = this.props.firebase.database().ref('rooms');
  }

   componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       console.log(room);
       room.key = snapshot.key;
       console.log(room.key);
       this.setState({ rooms: this.state.rooms.concat( room ) });
       });
     }

     handleNewRoomName(e) {
         let newRoomName = e.target.value;
         this.setState({roomName: newRoomName});
        }

     createRoom() {
        this.roomsRef.push({name: this.state.roomName});
        this.setState({roomName: ""});
     }
     

  render(){

  const template = this.state.rooms.map((room, i) => {

    return(
      <li key={room.key} onClick = {() => {this.props.setActiveRoom(room)}}>{room.name}</li>
      )
    });

    

       return (
          <div>
             <ul>
                {template}
             </ul>

             <p className="newRoom">Create A New Room</p>

             <form className="createRoom" onSubmit={(e) => {e.preventDefault(); this.createRoom()}}>
                <input
                   type="text"
                   placeholder="New Room Name"
                   value={this.state.roomName}
                   onChange={(e) => this.handleNewRoomName(e)} />
                 <br />
                 <button>Create Room</button>
              </form>
          </div>
        );
    }
};


export default RoomList;