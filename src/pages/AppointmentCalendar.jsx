import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../css/AppointmentCalendar.css"
import AppointmentService from "../services/AppointmentService";
import TokenService from "../services/TokenService";


momentLocalizer(moment);

const AppCalendar = () => {

   const [apps, setAppointments] = useState([]);
   const [selectedEvent, setSelectedEvent] = useState(undefined)
   const [modalState, setModalState] = useState(false)


   useEffect(() => {
   
    const fetchData = async  () => {

      //make it so it shows different title for the appointment depending on whether is a doctor loggedin or client ex: Doctor -> appointment for Zara(zara being a link redirecting to zara's info page) Client -> Neurology appointment with Dr.Maria 
        try {
          const userId = TokenService.getClaims().userId
          const data = await AppointmentService.getAppointments(userId);

          console.log(data)

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
      title: `Appointment with \n Dr.Maria \n for ${app.pet.name}`,
      start: new Date(app.dateAndStart),
      end: new Date(app.dateAndEnd), 
      data: app
    })) : []


   const handleSelectedEvent = (event) => {
      setSelectedEvent(event)
      setModalState(true)
   }

   const Modal = () => {
       return (
          <div className={`modal-${modalState == true ? 'show' : 'hide'}`}>
          </div>
       )
   }

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
                            <span className="text"> My Appointments </span>
                        </div>

                      {selectedEvent && <Modal/>}
                      <Calendar
                          localizer={momentLocalizer(moment)}
                          events={userApps}
                          views={["month", "week", "day", "agenda"]}
                          defaultView="month"
                          defaultDate={new Date()}
                          selectable
                          min={new Date().setHours(9, 0, 0)}
                          max={new Date().setHours(16, 0, 0)}
                          onSelecting={modalState}
                      />

                       
                    </div>

                </div>



            </section>
        </div>
    </div>
      );
}
 
export default AppCalendar;