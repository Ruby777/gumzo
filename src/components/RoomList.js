import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        rooms: [],
        newRoomName:' ',
        submit:
    }

   this.roomsRef = this.props.firebase.database().ref('rooms');
}

   componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       console.log(snapshot);
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) })
     });

     handleNewRoomName(e){
         console.log("new room name:"+ e.target.value)
         this.setState({newRoomName: e.target.value})
     }

     createRoom(e){
       this.roomsRef.push({
         name: newRoomName
       });

     }
}

    render(){
      const room = this.state.rooms.map(room);
          return(
          <div>
            <li>
                 {room}
            </li>
            <form name="formname">
                <input type="text"
                name="fname"
                placeholder="New Room Name"
                onChange={this.state.newRoomName}
                handleNewRoomName={(e) => this.handleNewRoomName(e)}>
                <br />
                <button onClick={this.createRoom}>Create Room</button>

             </form>
          </div>

      );
    }
}



export default RoomList;
