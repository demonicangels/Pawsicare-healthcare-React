import { useState, useEffect } from "react";
import DoctorService from "../services/DoctorService";
import { Box, Typography } from "@mui/material";
import '../css/ChatRoom.css'

const SendMessagePlaceholder = (props) => {

  const [message, setMessage] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [destinationUsername, setDestinationUsername] = useState('');

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    DoctorService.getAllDoctors()
      .then(data => setDoctors(data.doctors))
  }, []);

  const onMessageSend = () => {
    if (!message) {
      alert('Please type a message!');
      return;
    }

    const to = selectedDoctor ? selectedDoctor.id : destinationUsername;
  
    props.onMessageSend({ 'text': message, 'to': to });
    setMessage('');

  }

  const onSubmit = (event) => {
    event.preventDefault();
  }

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
  }

  return (
    <form onSubmit={onSubmit}>
      <br />
      <Box className="doctorContainer">
        <div className="doctorGrid">
          {doctors.map((doc, index) => (
            <div key={index} className="doctor-Box" onClick={() => handleDoctorClick(doc)}>
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
          ))}
        </div>
      </Box>
      <input type="text" className="input-message" onChange={(event) => setMessage(event.target.value)} value={message} placeholder="Message..."></input>

      {selectedDoctor && (
        <div>
          <Typography variant='subtitle1'>Selected Doctor: {selectedDoctor.name}</Typography>
          <Typography variant='subtitle2'>Field: {selectedDoctor.field}</Typography>
        </div>
      )}

      <button type="button" className="send-button" onClick={onMessageSend}>Send</button>
    </form>
  );
}

export default SendMessagePlaceholder;