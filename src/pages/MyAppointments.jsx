import { useEffect, useState } from "react";
import AppointmentService from "../services/AppointmentService";
import TokenService from "../services/TokenService";
import '../css/MyAppointments.css';
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {

    const [userApps, setUserApps] = useState([]);
    const [appMonth, setAppMonth] = useState('');
    const [appYear, setAppYear] = useState('');
    const navigate = useNavigate();


    const userId = TokenService.getClaims().userId

    const convertTime = (time) => {
        const [hours, minutes] = time.split(':');
  
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

    }

    useEffect (() => {

        const getUserAppointments = async () => {
            const appointments = await AppointmentService.getAppointments(userId)

            setUserApps(appointments)

            if(appointments){
                appointments.map(app =>{
                    const startDate = new Date(app.dateAndStart);
        
                    const monthIndex = startDate.getMonth();
    
                    const month = monthNames[monthIndex];
                    const year = startDate.getFullYear();
                    setAppMonth(month);
                    setAppYear(year);
    
                })
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

    const deleteAppointment =  async (app) =>{

        debugger
        const response = await AppointmentService.cancelAppointment(app.id, TokenService.getAccessToken())

        if(response === 'true'){
            console.log("Successful")
        }

    }

    return (  

        <div className="page-content">
            <a className="appForDateTitle">{`My appointments for ${appMonth} ${appYear}`}</a>
            <div className="appointmentsList">
            {userApps !== undefined ? (
                userApps.map((app, index) => {
                    const startDate = new Date(app.dateAndStart);
                    const endDate = new Date(app.dateAndEnd);

                    const appDate = startDate.toISOString().split('T')[0];
                    const startTime = startDate.toTimeString().split(' ')[0];
                    const endTime = endDate.toTimeString().split(' ')[0];

                    return (
                    <div className="appointment-row" key={index}>
                        <div className="appointment-Box">
                        <a> Date: {appDate}</a>
                        <a> {`Time: ${convertTime(startTime)}h - ${convertTime(endTime)}h`}</a>
                        <div className="appButtons">
                            <button className="rescheduleBtn">Reschedule</button>
                            <button className="removeBtn" onClick={() => { deleteAppointment(app) }}>
                            Cancel appointment
                            </button>
                        </div>
                        </div>
                    </div>
                    );
                })
                ) : (
                <div className="noAppText"> No upcoming appointments.</div>
                )}
                <button className="redirectToCalendarbtn" onClick={redirectToCalendar}> My calendar </button>
            </div>
        </div>
    );
}
 
export default MyAppointments;