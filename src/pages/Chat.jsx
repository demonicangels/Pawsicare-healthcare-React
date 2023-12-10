import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import UserService from '../services/UserService';
import { useState, useEffect } from 'react';

import ChatMessagesPlaceholder from '../components/ChatMessagesPlaceHolder';
import SendMessagePlaceholder from '../components/SendMessagePlaceholder';
import TokenService from '../services/TokenService';
import UsernamePlaceholder from '../components/UsernamePlaceholder';


const Chat = (props) => {
    const [stompClient,setStompClient] = useState(null);
    const [sender,setSender] = useState(); //set the username by getting the user from the database using the method in userService
    const [username,setUsername] = useState()
    const [receiver, setReceiver] = useState();
    const [messagesReceived, setMessages] = useState([]);
   
  
    const token = TokenService.getClaims()
    const userRole = token.role 
    const usrId = token.userId

    useEffect(() => {
      const fetchDataAndSetUsername = async () => {
        if (userRole === "Client") {
          try {
            const response = await UserService.getClient(usrId);
    
            console.log(response.client);
    
            if (response && response.client) {
              setSender(response.client);
              setUsername(response.client.name);
              return;
            } else {
              console.error('Invalid response format:', response);
            }
    
          } catch (error) {
            console.error('Error getting client:', error);
            console.log('Error message:', error.message);
          }
        }
    
        if (userRole === "Doctor") {
          try {
            const response = await UserService.getDoctor(usrId);
    
            console.log(response.doctor);
    
            if (response && response.doctor) {
              setSender(response.doctor);
              setUsername(response.doctor.name);
              return;
            } else {
              console.error('Invalid response format:', response);
            }
    
          } catch (error) {
            console.error('Error getting doctor:', error);
            console.log('Error message:', error.message);
          }
        }
      };
    
      fetchDataAndSetUsername();
    }, []);
  
   

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

      stompClient.subscribe(`/user/${username}/private`, (data) => {
        onMessageReceived(data);
      });
    };

    stompClient.activate();

    setStompClient(stompClient);
  }

     
  const sendMessage = (newMessage) => {
    const payload = { 'id': uuidv4(), 'from': username, 'to': newMessage.to, 'text': newMessage.text };
    if (payload.to) {
      stompClient.publish({ 'destination': `/user/${receiver}/private`, body: JSON.stringify(payload) });
    } else {
      stompClient.publish({ 'destination': '/chat/publicmessages', body: JSON.stringify(payload) });
    }
  };

  const onUsernameInformed = () => {
      setupStompClient(username);
  }  

  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body)
    setMessages(messagesReceived => [...messagesReceived,message])
  }

    useEffect(() => {
        if (username) {
          setupStompClient(username);
        }
    }, [username]);

    useEffect(() => {
      return () => {
        if (stompClient) {
          stompClient.deactivate();
        }
      };
    }, [stompClient]);


    return ( 
        <div className="ChatRoom">
            <UsernamePlaceholder username={username} receiver={receiver} onUsernameInformed={onUsernameInformed} />
            <br></br>
            <SendMessagePlaceholder username={username} onMessageSend={sendMessage} />
            <br></br>
            <ChatMessagesPlaceholder username={username} messagesReceived={messagesReceived} />
        </div>
    );
}
 
export default Chat;