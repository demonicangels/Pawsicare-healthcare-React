import { useState, useEffect } from "react";
import DoctorService from "../services/DoctorService";
import { Box, Typography } from "@mui/material";
import '../css/ChatRoom.css'
import TokenService from "../services/TokenService";
import UserService from "../services/UserService";
import { client } from "webstomp-client";

const SendMessagePlaceholder = (props) => {

  const [message, setMessage] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [clients,setClients] = useState([]);
  const [destinationUsername, setDestinationUsername] = useState('');

  const [selectedUser, setSelectedUser] = useState(null);

  const userRole = TokenService.getClaims().role;

  useEffect(() => {
    if(userRole === 'Client'){
      DoctorService.getAllDoctors()
      .then(data => setDoctors(data.doctors))
    }
    else{
      UserService.getAllClients()
      .then(data => setClients(data.clients))
    }

  }, []);

  const onMessageSend = () => {
    if (!message) {
      alert('Please type a message!');
      return;
    }

    const to = selectedUser ? selectedUser.id : destinationUsername;
  
    props.onMessageSend({ 'text': message, 'to': to });
    setMessage('');

  }

  const onSubmit = (event) => {
    event.preventDefault();
  }

  const handleUserClick = (usr) => {
    setSelectedUser(usr);
  }

  return (
    <form onSubmit={onSubmit}>
      <br />
      <Box className="doctorContainer">
        <div className="doctorGrid">
        {userRole === 'Client' ? doctors.map((doc, index) => (
          <div key={index} className="doctor-Box" onClick={() => handleUserClick(doc)}>
            <img src={doc.image} alt="" className="docImage" />
            <Box width='60%'>
              <Typography variant='body1' className="doctorName">{doc.name}</Typography>
              <Typography variant='body2' className="doctorEmail">{doc.email}</Typography>
              <Box className="doctorDetails">
                <Typography variant='body2' className="detailLabel">Field: </Typography>
                <Typography variant='body2' className="detailValue">{doc.field}</Typography>
              </Box>
            </Box>
          </div>
        )) : clients.map((cli, index) => (
          <div key={index} className="doctor-Box" onClick={() => handleUserClick(cli)}>
             <Box width='60%'>
              <Typography variant='body1' className="doctorName">{cli.name}</Typography>
              <Typography variant='body2' className="doctorEmail">{cli.email}</Typography>
            </Box>
          </div>
        ))}
        </div>
      </Box>
      <input type="text" className="input-message" onChange={(event) => setMessage(event.target.value)} value={message} placeholder="Message..."></input>

      {selectedUser && (
        <div>
          <Typography variant='subtitle1'>Selected User: {selectedUser.name}</Typography>
        </div>
      )}

      <button type="button" className="send-button" onClick={onMessageSend}>Send</button>
    </form>
  );
}

export default SendMessagePlaceholder;