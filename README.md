# Gumzo

## Description:
* Gumzo is a chat application that allows users to send and receive messages in real time.


## User Guideline:
* Go to [Gumzo](https://guarded-brushlands-71516.herokuapp.com/)
* Sign in to your account
* Select a chat-room depending on which team you would like to reach out to
* Have conversations with other users in real-time
* Create a new chat room if the team/category is not on the list


## Setup and Configuration:

### Languages and Frameworks:
* ReactJS Library
* HTML / CSS
* Firebase as a backend and authentication service
* MomentJS to convert timestamp to human readable time


## Running the application locally:
* Clone or download the repository
* Run `npm install --save`
* Start the react server using `npm start`
* Run the application through localhost:3000

## Building The App's Features: A summary

#### List of available chat rooms

The first feature to build was the user’s ability to see a list of available chat rooms. I added Firebase to the project using ` $ npm install -S firebase`, imported it `import * as firebase from ‘firebase’` and finally took configuration settings from Firebase and added them to App.js. I then created a Rooms.js component to store and render the chat rooms. 

   
       this.state = {
            rooms: []
        };
     
    
I needed to add a Firebase reference which helps to create, read, update or delete items at a specific path. Here,  I specified this reference for the rooms array above. 

   
      this.roomsRef = this.props.firebase.database().ref(‘rooms’)
    
    
To read data from the Firebase reference and sync data between the Firebase databse and the app's state, I used the `child_added` event.

   
        componentDidMount(){
          this.roomsRef.on(‘child_added’, snapshot  => {
            const  room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat(room) })
          });
         }  
    
    
On the above code example, the snapshot object includes metadata about the data entries made. Its val() and key() properties contain the actual data and object’s key respectively. I also used `concat()` instead of `push()` to add rooms to the rooms array, and return a new array without changing the existing array.

#### Create chat rooms

For this feature, I created a form with an input field and submit button where the user can specify a name for the new room, and linked the code below to the form's onSubmit event: 
   
        this.roomsRef.push({name: this.state.roomName});
        this.setState({roomName: “” });
  
   
The above code would not completely work on its own, without the `handleNewRoomName(e)` which is responsible for "listening" to the input field for the name the user specified.
   
      handleNewRoomName(e){
        let newRoomName = e.target.value;
        this.setState({roomName: newRoomName});
      }
  
   
#### List of Messages

Here, I created a MessageList component to store and render messages. Like RoomsList, we added a messages array;

        This.state = {
            messages:[],
                username: “”,
                content: “”,
                sentAt: “”,
                roomId: “”
        }

The chat application only has 1 active room displaying messages at a time. For this reason, I kept the active room in the App.js component’s state object, to make it accessible throughout the app; both in the roomList component and messageList component.

          this.state = {
          activeRoom: null
          }

I also added a Firebase reference for the messages 

        this.messagesRef = this.props.firebase.database().ref(‘messages’)); 

as well as a `child_added` event and `snapshot` object for the message array.

          componentDidMount(){
             this.messagesRef.on(‘child_added’, snapshot => {
                const message = snapshot.val();
                message.key = snapshot.key;
                this.setState({ messages: this.state.messages.concat(message) });
              });
           }
           
 
#### Set current user's name to display in chat:

For this feature, I made a User.js component and added code to read and store names of current users so they display in-chat once the user has been authenticated.

            componentDidMount(){
              this.props.firebase.auth().onAuthStateChanged(user => {
              this.props.setUser(user);
              });
            }
   
This bit of code was placed in the render function, to render the currentUser's name to the UI;

            this.props.currentUser.displayName
            
#### Sending messages associated to the current user:

Similar to adding and creating rooms, I added a `handleNewMessage(e)` and `createNewMessage()` function to handle currentUsers' messages and display to the UI, under the currentUser's name.

