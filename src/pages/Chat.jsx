import SockJS from 'sockjs-client/dist/sockjs';
import { v4 as uuidv4 } from 'uuid';
import webstomp from  "webstomp-client";
import UserService from '../services/UserService';
import { useState, useEffect } from 'react';
import '../css/Chat.css'


import ChatMessagesPlaceholder from '../components/ChatMessagesPlaceHolder';
import SendMessagePlaceholder from '../components/SendMessagePlaceholder';
import TokenService from '../services/TokenService';
import UsernamePlaceholder from '../components/UsernamePlaceholder';


const Chat = () => {
  

  //make so when a user logs in his picture appears as a circle instead of the client icon and redirects to the profile page it also has an arrow for drop down so the user can logout and go to profile from there
    const [sender,setSender] = useState(); //set the username by getting the user from the database using the method in userService
    const [username,setUsername] = useState()
    const [receiver, setReceiver] = useState();
    const [messagesReceived, setMessages] = useState([]);

    let stompClient=null;
  
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

    if(!stompClient){
      const sock = new SockJS('http://localhost:8080/ws')
      stompClient = webstomp.over(sock)
      stompClient.connect({}, () => {
        stompClient.subscribe('/chat/public', (data) => {
          console.log(data)
          onMessageReceived(data)
        })
        stompClient.subscribe(`/user/${username}/private`, (data) => {
          console.log(data)
          onMessageReceived(data)
        })
        stompClient.activate();

      }), (error) => {
        console.error('Error connecting to Stomp:', error);
      };
    }
}

  setupStompClient(username);
     
  const sendMessage = (newMessage) => {
    const payload = { 'id': uuidv4(), 'from': username, 'to': newMessage.to, 'text': newMessage.text };
    if (payload.to) {
      stompClient.send(`/app/message/private/${newMessage.to}`, {}, JSON.stringify(payload));
    } else {
      stompClient.send('/app/message/public', {}, JSON.stringify(payload));
    }
  };

  const onUsernameInformed = () => {
      setupStompClient(username);
  }  

  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body)
    console.log('Received message:', message);
    setMessages(messagesReceived => [...messagesReceived,message])
  }

    useEffect(() => {
        if (username) {
          setupStompClient(username);
        }
    }, [username]);

    // useEffect(() => {
    //   return () => {
    //     if (stompClient) {
    //       stompClient.disconnect(); // Disconnect if a disconnect method is available
    //       stompClient = null; // Set stompClient to null to clean up the reference
    //     }
    //   };
    // }, [stompClient]);


    return ( 
      <div className="chat-box">
            <UsernamePlaceholder username={username} receiver={receiver} onUsernameInformed={onUsernameInformed} />
            <br></br>
            <SendMessagePlaceholder username={username} onMessageSend={(message) => sendMessage(message)} />
            <br></br>
            <ChatMessagesPlaceholder username={username} messagesReceived={messagesReceived} />
        </div>
    );
}
 
export default Chat;