import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../css/AppointmentCalendar.css"
import AppointmentService from "../services/AppointmentService";


momentLocalizer(moment);

const AppCalendar = () => {

   const [apps, setAppointments] = useState([]);


   useEffect(() => {
   
    const fetchData = async () => {
        try {
          const userId = sessionStorage.getItem("userId")
          const data = await AppointmentService.getAppointments(userId);


          if (Array.isArray(data)) {

            setAppointments(data);

            console.log(data)

          } else {
            console.error('Data is not an array:', data);
          }
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      };
  
    fetchData();

    },[]);

   const userApps = apps
     ? apps.map(app => ({
      title: `Appointment with \n neurologist Dr.Maria \n for ${app.pet.name}`,
      start: new Date(app.dateAndStart),
      end: new Date(app.dateAndEnd), 
      data: app
    })) : []

    return (
        <div>
        <div id="Calendar">
            <section className="dashboard">
                <div className="top">
                    <i className="aryal sidebar-toggle"></i>
                </div>

                <div className="dash-content">
                    <div className="overview">
                        <div className="title">
                            <i className="bi-calendar-check-fill"></i>
                            <span className="text"> Make An Appointment </span>
                        </div>
                        <Calendar
                            localizer={momentLocalizer(moment)}
                            events={userApps}
                            views={["month", "week", "day", "agenda"]}
                            defaultView="month"
                            defaultDate={new Date()}
                            selectable
                            min={new Date().setHours(9, 0, 0)}
                            max={new Date().setHours(16, 0, 0)}

                        />

                       
                    </div>

                </div>



            </section>
        </div>
    </div>
      );
}
 
export default AppCalendar;