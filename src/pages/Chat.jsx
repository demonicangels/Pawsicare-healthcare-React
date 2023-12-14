import {Client} from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import UserService from '../services/UserService';
import { useState, useEffect } from 'react';
import '../css/Chat.css'
import DoctorService from '../services/DoctorService';


import ChatMessagesPlaceholder from '../components/ChatMessagesPlaceHolder';
import SendMessagePlaceholder from '../components/SendMessagePlaceholder';
import TokenService from '../services/TokenService';
import UsernamePlaceholder from '../components/UsernamePlaceholder';


const Chat = () => {
  

  //make so when a user logs in his picture appears as a circle instead of the client icon and redirects to the profile page it also has an arrow for drop down so the user can logout and go to profile from there
    const [messagesReceived, setMessages] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState(0);
    const [username,setUsername] = useState('');
    const [stompClient, setStompClient] = useState();
  
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
              setUsername(response.client.name);
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

      const fetchDoctors = () =>{
          DoctorService.getAllDoctors()
          .then(data => setDoctors(data.doctors))
      }; 
    
      fetchDataAndSetUsername();
      fetchDoctors();
      setupStompClient();

    }, []);
  
   
    const setupStompClient = () => {
      console.log('#3')

      try{
        
          const stompClient = new Client({brokerURL: 'ws://localhost:8080/ws'})
  
          stompClient.onConnect = () => {

            console.log(`Subscribed to /user/${usrId}/chat`)

            stompClient.subscribe(`/user/${usrId}/chat`, (data) => {

              console.log(data.body)
              onMessageReceived(data.body)

            })
          }

          stompClient.activate();
          setStompClient(stompClient);
  
      }catch(error){
          console.error('Error connecting to Stomp:', error);
      };
    }

    const sendMessage = (newMessage) => {
      console.log("meeting")
      const payload = { 'id': uuidv4(), 'from': username, 'to': newMessage.to, 'text': newMessage.text };
      //if (payload.to) {
        const jsonPayload = JSON.stringify(payload)
        console.log(`Sending to /user/${payload.to}/chat`)
        stompClient.publish({'destination': `/user/${payload.to}/chat`, body: jsonPayload});
      //} make a client listen to himself and the doctor so he sees both messages and that acts like a chatroom
      // } else {
      //   stompClient.publish('/chat/public', {}, JSON.stringify(payload));
      // }
    };


  const onMessageReceived = (newmsg) => {
    console.log('Received message:', newmsg);
    const message = JSON.parse(newmsg)
    setMessages(messagesReceived => [...messagesReceived,message])
  }


    return ( 
      <div className="chat-box">
            <UsernamePlaceholder username={username}/>
            <br></br>
            <SendMessagePlaceholder username={username} onMessageSend={sendMessage} />
            <br></br>
            <ChatMessagesPlaceholder username={username} messagesReceived={messagesReceived} />
        </div>
    );
}
 
export default Chat;