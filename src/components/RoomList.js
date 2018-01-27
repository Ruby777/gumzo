import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        rooms: [],
        roomName:'',
        submit:''
      };

   this.roomsRef = this.props.firebase.database().ref('rooms');
}
   componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       console.log(snapshot);
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) });
       });
     }

     handleNewRoomName(e) {
         let newRoomName = e.target.value;
         this.setState({roomName: newRoomName});
     }

     // createRoom() {
     //   this.roomsRef.push({name: newRoomName});
     // }


  render(){

      const template = this.state.rooms.map((room, i) => {

        return(
           <li key={room.key}>{room.name}</li>
           )
         });

      return (
       <div>
         <ul>
            {template}
         </ul>

         <button>New Room</button>

         <form className="createRoom">
            <input
               type="text"
               placeholder="New Room Name"
               onChange={this.handleNewRoomName()} />
             <br />
             <button onClick={this.createRoom()}>Create Room</button>
          </form>
        </div>
      );
    }
}


export default RoomList;
