import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import DoctorService from "../services/DoctorService";
import '../css/DoctorProfile.css';
import TokenService from "../services/TokenService";
import AppointmentService from "../services/AppointmentService";
import { Box, Typography } from "@mui/material";
import PetService from "../services/PetService";
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormDialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import MenuItem from '@mui/material/MenuItem';

const DocProfile = () => {
    const [doctor, setDoctor] = useState(null);
    const [openApps, setOpenApps] = useState([]);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [userPets, setUserPets] = useState([]);
    const [description, setDescription] = useState('');
    const [appPet, setAppPet] = useState(null);
    const [clientId, setClientId] = useState(0);

    const docId = sessionStorage.getItem("docId")
    const claims = TokenService.getClaims();

    useEffect(() => {
      setClientId(claims.userId);
    }, [claims.userId]);

    const convertTime = (time) => {
      let hours = Math.floor(time/60)
      let minutes = time%60

      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    }

  
    useEffect(() => {
      const getDocInfo = async () => {
        try {

          const data = await DoctorService.getDoctorById(docId, TokenService.getAccessToken())
         
          if(data.doctor){
            setDoctor(data.doctor)
          }
  
        } catch (error) {
          console.error('Error fetching doctor information:', error.message);
        }
      };

      const fetcUsersPets = async () =>{
        try{
            const userId = TokenService.getClaims().userId
            const pets = await PetService.getPetsByOwnerId(userId)
            setUserPets(pets.pets)
        }
        catch(err){
            console.log("Error fetching the pets of the user",err.message)
        }
      }

      getDocInfo();
      fetcUsersPets();
  
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
                date: `${app.date}`,
                start: `${convertTime(app.startTime)}`,
                end: `${convertTime(app.endTime)}`
            }));

            const data = await DoctorService.getDoctorById(docId, TokenService.getAccessToken());

            if (data) {
                setOpenApps(docAppointments);
                setDoctor(data.doctor);  // Move setting events inside the if block
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
      setOpen(true);
      const jsonObj = JSON.stringify(app)
      sessionStorage.setItem("chosenAppointment", jsonObj)
    }

    const handleClose = () =>{
      setOpen(false);
      const chosenSlot = JSON.parse(sessionStorage.getItem("chosenAppointment"))
      const appointment = {
        date: `${chosenSlot.date}`,
        start: `${chosenSlot.start}`,
        end: `${chosenSlot.end}`,
        clientId: clientId,
        doctorId: docId,
        petId: appPet.id 
      }
      AppointmentService.createAppointment(appointment);
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
                <Typography variant='body1' className="doctorName">{`${a.date}  ${a.start} - ${a.end}`}</Typography>
              </Box>
            </div>
          ))
          )}  
        </div>
        <FormDialog open={open} onClose={handleClose}>
                    <DialogTitle>Make an appointment</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please choose a pet and fill the reason for the appointment.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="desc"
                                label="Reason for meeting"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={e => {
                                    setDescription(e.target.value)
                                }}
                            />
                            <label>Pet</label>
                              <Select
                              label="Pet"
                              variant="outlined"
                              placeholder="Pet"
                              className="input-field"
                              value={appPet || ''}
                              onChange={(e) => setAppPet(e.target.value)}
                              >
                                {userPets.map((choice, index) => (
                                  <MenuItem key={index} value={choice}>
                                    {choice.name}
                                  </MenuItem>
                                ))}
                              </Select>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Save</Button>
                        </DialogActions>
                </FormDialog>
      </div>
      
    );
  };
  
  export default DocProfile;