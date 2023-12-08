import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../css/DoctorSchedule.css"
import AppointmentService from "../services/AppointmentService";
import TokenService from "../services/TokenService";
import DoctorService from "../services/DoctorService";

const ScheduleCalendar = () => {
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [desc, setDesc] = useState("");
    const [openSlot, setOpenSlot] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [doc, setDoc] = useState(null);
    const [docOptions, setDocOptions] = useState([]);
    const [, setLoading] = useState(false);
    const views = ["month", "week", "day", "agenda"];

    const docId = sessionStorage.getItem("docId");

    const convertTime = (time) => {
        let hours = Math.floor(time/60)
        let minutes = time%60

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    }


    useEffect(() => {
        const fetchDocBookings = async () => {
            try {
    
                const docSchedule = AppointmentService.addEmptyBookings(docId);
    
                const docAppointments = docSchedule.map(app => ({
                    title: `${convertTime(app.startTime)} - ${convertTime(app.endTime)}`,
                    start: new Date(app.date),
                    end: moment(app.date).add(app.endTime - app.startTime, 'minutes').toDate(),
                }));
    
                const data = await DoctorService.getDoctorById(docId);
    
                if (data) {
                    setDoc(data.doctor);
                    setEvents(docAppointments);  // Move setting events inside the if block
                }

            } catch (error) {
                // Handle error
                console.error('Error fetching doctor bookings:', error);
            }
        };
    
        fetchDocBookings();
    
    }, [docId]);


    const handleClose = () => {
        setOpenSlot(false);
    };


    const handleSlotSelected = (slotInfo) => {
        console.log('Slot selected:', slotInfo);
        const { start, end } = slotInfo;
       
    
        if (docId) {
            setStart(start);
            setEnd(end);
            setTitle("");
            setDesc("");
            setOpenSlot(true);
            
        } else {
            setTitle("");
            setDesc("");
            setOpenSlot(true);
        }
    };

    const setNewAppointment = () => {
        const appointment = {title, start, end, desc};
        setEvents([...events, appointment]);
        handleBooking();
        handleClose();
        // Update start and end to trigger calendar refresh
    };


    const MAX_CHARACTERS = 20;

    const handleBooking = async () => {
        const appointmentDate = start.toISOString();
        const startHours = start.getHours();
        const startMinutes = start.getMinutes();
        const endHours = end.getHours();
        const endMinutes = end.getMinutes();
        const startTimeAsInt = (startHours * 100) + startMinutes;
        const endTimeAsInt = (endHours * 100) + endMinutes;
        let appointmentData = {
            description: desc,
            date: appointmentDate,
            startTime: startTimeAsInt,
            endTime: endTimeAsInt,
            doctorId: JSON.parse(docId).id,
            clientId: JSON.parse(TokenService.getClaims().id).id,
        };
        if (docId) {
            try {
                const data = await DoctorService.getDoctorById(docId);
                if(data){

                    appointmentData = {
                        ...appointmentData,
                        doctorName: data.doctor.name,
                    };

                    setDoc(data.doctor);

                }
            } catch (error) {
                console.error('Error fetching tutor name:', error);

            }
        } else {

            appointmentData = {
                ...appointmentData,
                doctorName: selectedOption,
            };
        }
        try {
            //const response = await AppointmentService.createBooking(appointmentData); //do the method in appointment
            console.log('Booking created successfully:', response);
        } catch (error) {
            console.error('Error creating booking:', error);
        } finally {
            handleClose();
        }

};

const handleOpen = () =>{
    setOpenSlot(true);
}

const doctorName = doc ? doc.name : "";


return (
    <div>
        <section className="dashboard">
            <div className="top"></div>
            <div className="dash-content">
                <div className="overview">
                    <div className="title"> Available appointments for Dr.{doctorName} </div>
                    <div id="Calendar">
                        {docId ? (
                            <Calendar
                                localizer={momentLocalizer(moment)}
                                events={events}
                                views={views}
                                defaultView="month"
                                defaultDate={new Date()}
                                selectable
                                onSelectSlot={handleSlotSelected}
                                min={new Date().setHours(9, 0, 0)}
                                max={new Date().setHours(17, 0, 0)}
                            />
                        ) : (
                            <Calendar
                                localizer={momentLocalizer(moment)}
                                events={events}
                                views={views}
                                defaultView="month"
                                defaultDate={new Date()}
                                selectable
                                onSelectSlot={handleSlotSelected}
                                min={new Date().setHours(9, 0, 0)}
                                max={new Date().setHours(17, 0, 0)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
        {openSlot && (
            <Dialog open={openSlot} onClose={handleClose}>
                <br/>
                <div>
                    {docId ? (
                        <div>
                            {/* Content for the dialog without tutor selection */}
                            {/* ... */}
                            <TextField
                                label="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                autoComplete="off"
                            />
                            <br/>
                            <TextField
                                label="Description"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                inputProps={{maxLength: MAX_CHARACTERS}}
                                autoComplete="off"
                            />
                            <br/>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={setNewAppointment}
                            >
                                Submit
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Select
                                value={docOptions.find((doc) => doc.value === selectedOption)}
                                onChange={(selected) => setSelectedOption(selected.value)}
                                options={docOptions.map((doc) => ({value: doc.value, label: doc.value}))}
                            />
                            <br/>
                            <TextField
                                label="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                autoComplete="off"
                            />
                            <br/>
                            <TextField
                                label="Description"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                inputProps={{maxLength: MAX_CHARACTERS}}
                                autoComplete="off"
                            />
                            <br/>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={setNewAppointment}
                            >
                                Submit
                            </Button>
                        </div>
                    )}
                </div>
                <br/>
            </Dialog>
        )}
    </div>
);}
 
export default ScheduleCalendar;