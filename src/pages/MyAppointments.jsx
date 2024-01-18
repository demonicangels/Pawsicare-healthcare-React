import { useEffect, useState } from "react";
import AppointmentService from "../services/AppointmentService";
import TokenService from "../services/TokenService";
import '../css/MyAppointments.css';
import { useNavigate } from "react-router-dom";
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import FormDialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import MenuItem from '@mui/material/MenuItem';

const MyAppointments = () => {

    const [userApps, setUserApps] = useState([]);
    const [appMonth, setAppMonth] = useState('');
    const [appYear, setAppYear] = useState('');
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [chosenAppForRescheduleID, setChosenAppForRescheduleID] = useState();
    const [docSchedule, setDocSchedule] = useState([]);
    const [selectedTimeInDialog, setSelectedTimeInDialog] = useState('');
    const [appToBeRescheduled, setAppToBeRescheduled] = useState();


    const userId = TokenService.getClaims().userId

    const convertTime = (time) => {
        const [hours, minutes] = time.split(':');
  
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

    }

    const convertDateAndTime = (app) =>{
        const startDate = new Date(app.dateAndStart);
        const endDate = new Date(app.dateAndEnd);

        const appDate = startDate.toISOString().split('T')[0];
        const startTime = startDate.toTimeString().split(' ')[0];
        const endTime = endDate.toTimeString().split(' ')[0];

        const slot = {
            id: app.id,
            date: appDate,
            start: startTime,
            end: endTime
        }

        return slot;

    }

    useEffect (() => {

        const getUserAppointments = async () => {
            const appointments = await AppointmentService.getAppointments(userId)

            appointments.map(async (app) =>{
                debugger
                const schedule = await AppointmentService.getDoctorSchedule(app.doctor.id, TokenService.getAccessToken())

                const formattedSchedule = schedule.map((app) =>{
                    return convertDateAndTime(app)
                })

                setDocSchedule(formattedSchedule)
            })

            const currentDate = new Date();

            const monthIndex = currentDate.getMonth();
    
            const month = monthNames[monthIndex];
            const year = currentDate.getFullYear();
            setAppMonth(month);
            setAppYear(year); 


            if(appointments){

               const filteredApps = appointments.filter((app) =>{
                    return(
                        app.client.email !== null &&
                        app.pet.name !== null
                    )
                })

                setUserApps(filteredApps)

            }
        }

        getUserAppointments();

    },[])

    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const redirectToCalendar = () => {
        navigate('/appointmentsInCalendar')
    }

    const redirectToDoctors = () => {
        navigate('/doctors')
    }

    const deleteAppointment =  async (app) =>{

        debugger
        const response = await AppointmentService.cancelAppointment(app.id, TokenService.getAccessToken())

        if(response === 'true'){
            console.log("Successful")
            sessionStorage.setItem("needsReload", true)
        }

    }

    const rescheduleAppointment = () =>{
        setOpenDialog(false)
        debugger
        const selectedReschedule = docSchedule.find(schedule => schedule.id === chosenAppForRescheduleID)
        const appToBeRescheduled = JSON.parse(sessionStorage.getItem('appToBeRescheduled'))
        sessionStorage.removeItem('appToBeRescheduled')
        const dateAndStart = `${selectedReschedule.date}T${selectedReschedule.start}`
        const dateAndEnd = `${selectedReschedule.date}T${selectedReschedule.end}`
        appToBeRescheduled.dateAndStart = dateAndStart
        appToBeRescheduled.dateAndEnd = dateAndEnd
        AppointmentService.rescheduleAppointment(appToBeRescheduled)
        sessionStorage.setItem('needsReload', true)
    }

    const closeDialog = () =>{
        setOpenDialog(false)
    }
    const openDialogRes = (app) =>{
        sessionStorage.setItem('appToBeRescheduled', JSON.stringify(app))
        setOpenDialog(true)
    }

    const reload = sessionStorage.getItem("needsReload")
    if(reload === "true"){
        sessionStorage.setItem("needsReload",false)
        window.location.reload()
    }

    return (  

        <div className="page-content">
            <a className="appForDateTitle">{`My appointments for ${appMonth} ${appYear}`}</a>
            <div className="appointmentsList">
            {userApps !== undefined && userApps.length !== 0 ? (
                userApps.map((app, index) => {
                    const startDate = new Date(app.dateAndStart);
                    const endDate = new Date(app.dateAndEnd);

                    const appDate = startDate.toISOString().split('T')[0];
                    const startTime = startDate.toTimeString().split(' ')[0];
                    const endTime = endDate.toTimeString().split(' ')[0];

                    return (
                    <div className="appointment-row" key={index}>
                        {TokenService.getClaims().role === "Client" ? <div className="descriptionText">{`Appointment with Dr. ${app.doctor.name} for patient ${app.pet.name}`}</div> : <div className="descriptionText">{`Appointment for patient ${app.pet.name} Owner: ${app.client.email}`}</div> }
                        <div className="appointment-Box">
                        <a> Date: {appDate}</a>
                        <a> {`Time: ${convertTime(startTime)}h - ${convertTime(endTime)}h`}</a>
                        <div className="appButtons">
                            <button className="rescheduleBtn" onClick={() => {openDialogRes(app)}}>Reschedule</button>
                            <button className="removeBtn" onClick={() => { deleteAppointment(app) }}>
                            Cancel appointment
                            </button>
                        </div>
                        </div>
                    </div>
                    );
                })
                ) : (
                <>
                    <div className="noAppText"> No upcoming appointments.</div> 
                    <button onClick={redirectToDoctors} className="redirectToDoctorsPage">Book an appointment</button>
                </>
                )}
                <button className="redirectToCalendarbtn" onClick={redirectToCalendar}> My calendar </button>
            </div>

            <FormDialog open={openDialog} onClose={rescheduleAppointment}>
                <DialogTitle>Reschedule the appointment with Dr.  for </DialogTitle>
                <DialogContent>
                <DialogContentText>Please choose a more suitable time for the appointment. 
                    Dr. will be notified of that change. WARNING: The doctor can unexpectedly become unavailable on your chosen date so they will cancel your meeting. 
                    You will be notified and asked to make a new appointment.</DialogContentText>
                <label>Available schedule</label>
                <Select
                    label="doc"
                    variant="outlined"
                    placeholder="docSchedule"
                    className="input-field"
                    value={selectedTimeInDialog || ''}
                    onChange={(e) => {
                        const selected = e.target.value;
                       
                        const formattedDialogDisplay = `${selected.date} ${convertTime(selected.start)} - ${convertTime(selected.end)}`
                        console.log(formattedDialogDisplay)
                        setSelectedTimeInDialog(formattedDialogDisplay)
                        setChosenAppForRescheduleID(selected.id);}}
                >
                    {docSchedule.map((choice, index) => (
                    <MenuItem key={index} value={choice}>
                        {choice.date} {choice.start} - {choice.end}
                    </MenuItem>
                    ))}

                </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button onClick={rescheduleAppointment}>Save</Button>
                </DialogActions>
            </FormDialog>
        </div>
    );
}
 
export default MyAppointments;