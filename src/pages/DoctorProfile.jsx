import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import DoctorService from "../services/DoctorService";
import '../css/DoctorProfile.css';
import TokenService from "../services/TokenService";
import AppointmentService from "../services/AppointmentService";
import { Box, Typography } from "@mui/material";
import PetService from "../services/PetService";
import { Select } from "@mui/base";

const DocProfile = () => {
    const [doctor, setDoctor] = useState(null);
    const [openApps, setOpenApps] = useState([]);
    const navigate = useNavigate();

    const docId = sessionStorage.getItem("docId")
    const claims = TokenService.getClaims();

    const convertTime = (time) => {
      let hours = Math.floor(time/60)
      let minutes = time%60

      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    }

  
    useEffect(() => {
      const getDocInfo = async () => {
        try {
          const data = await DoctorService.getDoctorById(docId)
         
          if(data){
            setDoctor(data.doctor)
          }
  
        } catch (error) {
          console.error('Error fetching doctor information:', error.message);
        }
      };

      getDocInfo()
  
    }, []);

    useEffect(() => {

      const setDoctorAfterRender = (response) =>{
        setDoctor(response)
        console.log(doctor)
      }

      const fetchDocBookings = async () => {
        try {

            const docSchedule = AppointmentService.addEmptyBookings(docId);

            const docAppointments = docSchedule.map(app => ({
                date: `Date ${app.date}`,
                title: `${convertTime(app.startTime)} - ${convertTime(app.endTime)}`,
            }));

            const data = await DoctorService.getDoctorById(docId);

            if (data) {
                setOpenApps(docAppointments);  // Move setting events inside the if block
            }

        } catch (error) {
            // Handle error
            console.error('Error fetching doctor bookings:', error);
        }
      };

      fetchDocBookings();
      setDoctorAfterRender(doctor);


    },[docId])
  
    if (!doctor) {
      return <div>Loading...</div>;
    }

    const handleScheduleRedirecting = () =>{
      navigate('/docSchedule')
    }

    const handleChosenAppointment = (app) => {


    }

    const formatDate = (date) =>{
      const formatted = new Date(date).toISOString()
      return formatted;
    } 
  
    return (
      <div className="profile-content">
        <img src={doctor.image} alt={`${doctor.image}`} />
        <div className="text-content">
          <p>{`Dr. ${doctor.name}`}</p>
          <p>{`Email: ${doctor.email}`}</p>
          <p>{`Work field: ${doctor.field}`}</p>
          {claims.userId == docId ? (
          <button onClick={handleScheduleRedirecting}> Make my schedule</button>) : ( openApps.map((a, index) => (
            <div key={index} className='doctor-Box' onClick={() => handleChosenAppointment(a)}>
              <Box width='60%'>
                <Typography variant='body1' className="doctorName">{`${a.date}  ${a.title}`}</Typography>
              </Box>
            </div>
          ))
          )}  
        </div>
      </div>
    );
  };
  
  export default DocProfile;