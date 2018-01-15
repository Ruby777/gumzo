this.state = {
  rooms: []
};

   this.rooms  this.props.firebase.database().ref('rooms');

componentDidMount(){
  this.roomsRef.on('child_added', snapshot =>{
    const room = snapshot.val();
    room.key = snapshot.key;
    console.log(snapshot);
    this.setState({ rooms: this.state.rooms.concat( room ) })
  });
}
