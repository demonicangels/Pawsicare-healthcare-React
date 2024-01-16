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
    const [startHour, setStartHour] = useState('');
    const [endHour, setEndHour] = useState('');
    const [startDay, setStartDay] = useState('');
    const [endDay, setEndDay] = useState('');
    const [openDialogSC, setOpenDialogSC] = useState(false)
    const [weekDayOfAppointment, setweekDayOfAppointment] = useState('');
    const [chosenAppointment, setChosenAppointment] = useState('');
    const [appMonth, setAppMonth] = useState('');
    const [appYear, setAppYear] = useState('');

    const docId = sessionStorage.getItem("docId") === null ? TokenService.getClaims().userId : sessionStorage.getItem("docId")
    const claims = TokenService.getClaims();

    useEffect(() => {
      setClientId(claims.userId);
    }, [claims.userId]);

    const convertTime = (time) => {
      const [hours, minutes] = time.split(':');

      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    }

    const workingHours = ['8:00','9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];



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
            const token = TokenService.getAccessToken()
            const pets = await PetService.getPetsByOwnerId(userId,token)
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
        try{

          const docSchedule = await AppointmentService.getDoctorSchedule(docId, TokenService.getAccessToken());

          const openScheduledSlots = []

          docSchedule.forEach((app) => {
            const startDate = new Date(app.dateAndStart);
            const endDate = new Date(app.dateAndEnd);

            const monthIndex = startDate.getMonth();



            const appDate = startDate.toISOString().split('T')[0];
            const month = monthNames[monthIndex];
            setAppMonth(month);
            const year = startDate.getFullYear();
            setAppYear(year);
            const startTime = startDate.toTimeString().split(' ')[0];
            const endTime = endDate.toTimeString().split(' ')[0];

            const slot = {
              date: appDate,
              start: convertTime(startTime),
              end: convertTime(endTime),
            };

            openScheduledSlots.push(slot);

          })

          setOpenApps(openScheduledSlots);
             

          const data = await DoctorService.getDoctorById(docId, TokenService.getAccessToken());

          if (data) {
            setDoctor(data.doctor);
          }

        } catch (error) {
          console.error('Error fetching doctor bookings:', error);
        }
      };

      fetchDocBookings();
      setDoctorAfterRender(doctor);

    },[docId])
  
    if (!doctor) {
      return <div>Loading...</div>;
    }

    const handleChosenAppointment = (app) => {
      setOpen(true);
      const jsonObj = JSON.stringify(app)
      sessionStorage.setItem("chosenAppointment", jsonObj)

      setChosenAppointment(JSON.parse(jsonObj))

      const appDate = new Date(chosenAppointment.date)
      const indexOfDay = appDate.getDay()
      setweekDayOfAppointment(weekDays[indexOfDay - 1])
    }

    const createAppointment = async () =>{
      debugger
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
      
      const indexOfApp = openApps.findIndex((app) =>{
        return(
        app.date === chosenSlot.date &&
        app.start === chosenSlot.start)
      })

      if (indexOfApp !== -1) {
        openApps.splice(indexOfApp, 1);
        setOpenApps([...openApps]);
      }
    }
  
    const createSchedule = async () =>{
      setOpenDialogSC(false)
      const schedulePreferences = {
        token: TokenService.getAccessToken(),
        startDay: startDay,
        endDay: endDay,
        startHour: startHour,
        endHour: endHour
      } 
      const schedule = await AppointmentService.createSchedule(schedulePreferences)
    }

    const handleClose = () =>{
      setOpen(false)
    }

    const closeScheduleDialog = () =>{
      setOpenDialogSC(false)
    }
    
    const openScheduleDialog = () =>{
      setOpenDialogSC(true)
    }

    return (
      <div className="profile-content">
      <div className="left-section" style={{top: doctor.image ? '4rem' : '-4rem',
      position: claims.userId == docId ?  'relative'  : '',
      left: claims.userId == docId ? '16rem' : ''}}>
        <img src={doctor.image} alt={`${doctor.image ? doctor.image : ''}`} className="docPic" />
        <p className="doctorName">{`Dr. ${doctor.name}`}</p>
        <div className="line"></div>
        <p className="information" >
          Information
        </p>
        <div className="information-content">
            <p>Email: {doctor.email}</p>
            <p>Work field: {doctor.field}</p>
        </div>
        <div className="line"></div>
        <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </div>
      <div className="right-section">
      {claims.userId == docId ? (
          <button onClick={openScheduleDialog} className="scheduleButton">Make my schedule</button>
        ) : (
        <div className="appointmentSlots">
          <h1>Make an appointment</h1>
          {openApps.length !== 0 ? <a>{`Avalilable appointments for ${appMonth} ${appYear} `}</a> && openApps.map((a, index) => (
              <div key={index} className="doctor-Box" onClick={() => handleChosenAppointment(a)}>
                <Box width="60%">
                  <Typography variant="body1" className="doctorName">{`${a.date}  ${a.start} - ${a.end}`}</Typography>
                </Box>
              </div>
          )) : <a> No available appointment hours. </a>}
        </div>
        )}
      </div>

      <FormDialog open={open} onClose={handleClose}>
        <DialogTitle>{`Make an appointment for ${weekDayOfAppointment} ${chosenAppointment.date} ${chosenAppointment.start}h`} </DialogTitle>
        <DialogContent>
          <DialogContentText>Please choose a pet and fill the reason for the appointment.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="desc"
            label="Reason for meeting"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setDescription(e.target.value);
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
          <Button onClick={createAppointment}>Save</Button>
        </DialogActions>


      </FormDialog>
      
      <FormDialog open={openDialogSC} onClose={createSchedule}>
        <DialogTitle>Create my schedule</DialogTitle>
        <DialogContent>
          <DialogContentText>Please choose your daily working hours and work day. WARNING: The schedule will be created automatically for a whole month starting from today!</DialogContentText>
          <label>Start of working day (hour)</label>
          <Select
            label="start"
            variant="outlined"
            placeholder="StartHour"
            className="input-field"
            value={startHour || ''}
            onChange={(e) => setStartHour(e.target.value)}
          >
            {workingHours.map((choice, index) => (
              <MenuItem key={index} value={choice}>
                {choice}
              </MenuItem>
            ))}
          </Select>
          <label>End of working day (hour)</label>
          <Select
            label="end"
            variant="outlined"
            placeholder="EndHour"
            className="input-field"
            value={endHour || ''}
            onChange={(e) => setEndHour(e.target.value)}
          >
            {workingHours.map((choice, index) => (
              <MenuItem key={index} value={choice}>
                {choice}
              </MenuItem>
            ))}
          </Select>
          <label>Start of working week (week day)</label>
          <Select
            label="start"
            variant="outlined"
            placeholder="startDay"
            className="input-field"
            value={startDay || ''}
            onChange={(e) => setStartDay(e.target.value)}
          >
            {weekDays.map((choice, index) => (
              <MenuItem key={index} value={choice}>
                {choice}
              </MenuItem>
            ))}
          </Select>
          <label>End of working week (week day)</label>
          <Select
            label="end"
            variant="outlined"
            placeholder="endDay"
            className="input-field"
            value={endDay || ''}
            onChange={(e) => setEndDay(e.target.value)}
          >
            {weekDays.map((choice, index) => (
              <MenuItem key={index} value={choice}>
                {choice}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeScheduleDialog}>Cancel</Button>
          <Button onClick={createSchedule}>Save</Button>
        </DialogActions>
      </FormDialog>
    </div>
  );
};
export default DocProfile;
  
