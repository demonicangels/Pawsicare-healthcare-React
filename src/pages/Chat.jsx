import { Client } from 'stompjs';
import UserService from '../services/UserService';
import { useState } from 'react';
import ChatMessagesPlaceholder from '../components/ChatMessagesPlaceHolder';
import SendMessagePlaceholder from '../components/SendMessagePlaceholder';
import UsernamePlaceholder from '../components/UsernamePlaceholder';
import TokenService from '../services/TokenService';


const ChatRoom = () => {
    const [stompClient,setStompClient] = useState();
    const [user,setUser] = useState(); //set the username by getting the user from the database using the method in userService
    const [username,setUsername] = useState()
    const [messagesReceived, setMessages] = useState([]);
   
  
    const token = TokenService.getClaims()
    const userRole = token.role 
    const usrId = token.userId
  
    if(userRole === "Client"){
        UserService.getClient(usrId).then(response => setUser(response.data))
    }
    if(userRole === "Doctor"){
        UserService.getDoctor(usrId).then(response => setUser(response.data))
    }
  
    console.log(user);
    setUsername(user.name);
  
    const setupStompClient = (username) => {
  
      const stompClient = new Client({
        brokerUrl: 'ws://localhost:8080/chat',
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000
      });
  
      stompClient.onConnect = () => {
        stompClient.subscribe('/chat/messages', (data) => {
          console.log(data)
          onMessageReceived(data)
        });
  
        stompClient.subscribe(`/user/${username}/queue/inboxmessages`, (data) => {
          onMessageReceived(data);
        });
  
      };
  
      stompClient.activate();
  
      setStompClient(stompClient);
      
    }
    
    const sendMessage = (newMessage) => {
        const payload = { 'id': uuidv4(), 'from': username, 'to': newMessage.to, 'text': newMessage.text };
        if (payload.to) {
          stompClient.publish({ 'destination': `/user/${payload.to}/queue/inboxmessages`, body: JSON.stringify(payload) });
        } else {
          stompClient.publish({ 'destination': '/topic/publicmessages', body: JSON.stringify(payload) });
        }
    };
  
    const onMessageReceived = (data) => {
      const message = JSON.parse(data.body)
      setMessages(messagesReceived => [...messagesReceived,message])
    }
    return ( 
        <div className="ChatRoom">
            <UsernamePlaceholder username={username}/>
            <br></br>
            <SendMessagePlaceholder username={username} onMessageSend={sendMessage} />
            <br></br>
            <ChatMessagesPlaceholder username={username} messagesReceived={messagesReceived} />
        </div>
    );
}
 
export default ChatRoom;