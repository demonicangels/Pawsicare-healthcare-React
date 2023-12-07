import { useState,useEffect } from "react";
import '../css/ChatRoom.css'
import {Box, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import DoctorService from "../services/DoctorService";
import Chat from "./Chat";

const ChatRoom= () => {

    const[doctors,setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    

    useEffect(() => {
        DoctorService.getAllDoctors()
            .then(data => setDoctors(data.doctors))
    }, []);

    const handleDoctorClick = (doc) => {
        setSelectedDoctor(doc)
    }

    return ( 

        <Box className="doctorContainer">
        <div className="doctorGrid">
          {doctors.map((doc, index) => (
            <div key={index} className="doctor-Box" onClick={() => handleDoctorClick(doc)}>
              <img src={doc.image} alt="" className="docImage" />
              <Box width='60%'>
                <Typography variant='body1' className="doctorName">{doc.name}</Typography>
                <Typography variant='body2' className="doctorEmail">{doc.email}</Typography>
                <Box className="doctorDetails">
                  <Typography variant='body2' className="detailLabel">Field</Typography>
                  <Typography variant='body2' className="detailValue">{doc.field}</Typography>
                </Box>
              </Box>
            </div>
          ))}
        </div>

        {selectedDoctor && (
            <Link to={`/chat/${selectedDoctor}`} style={{ textDecoration: 'none', color: "black" }}>
            <Chat doctor={selectedDoctor} />
            </Link>
        )}
    </Box> );
}
 
export default ChatRoom