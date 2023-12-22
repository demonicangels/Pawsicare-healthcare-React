import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../css/DoctorSchedule.css"
import AppointmentService from "../services/AppointmentService";
import TokenService from "../services/TokenService";
import DoctorService from "../services/DoctorService";
import PetService from "../services/PetService";
import { Select } from "@mui/base";

const ScheduleCalendar = () => {
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [desc, setDesc] = useState("");
    const [open, setOpenDialog] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [doc, setDoc] = useState(null);
    const [userPets, setUserPets] = useState([]);
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

        const fetcUsersPets = async () =>{
            try{
                const userId = TokenService.getClaims().id
                const pets = await PetService.getPetsByOwnerId(userId)
                setUserPets(pets.pets)
            }
            catch(err){
                console.log("Error fetching the pets of the user",err.message)
            }
        }
    
        fetchDocBookings();
        fetcUsersPets();
    
    }, [docId]);


    const handleSlotSelected = (slotInfo) => {
        console.log('Slot selected:', slotInfo);
        const { start, end } = slotInfo;
       
    
        if (docId) {
            setStart(start);
            setEnd(end);
            setTitle("");
            setDesc("");
            
        } else {
            setTitle("");
            setDesc("");
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

const handleClose = () => {
    setOpenDialog(false);
};

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
                        ) : null }
                    </div>
                </div>
            </div>
        </section>
        {open && (
            <FormDialog open={open} onClose={handleClose}>
                <DialogTitle>Make an appointment</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please make your appointment
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={e => {
                                setDesc(e.target.value)
                            }}
                        />
                        <label>Pet</label>
                        <Select label="Pet" variant="outlined" placeholder="Pet" className="input-field" value={petGender} onChange={(e) => setGender(e.target.value)}>
                            {userPets.map((choice) => (
                                <MenuItem key={choice} value={choice}>
                                {choice}
                                </MenuItem>
                            ))}
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Save</Button>
                    </DialogActions>
        </FormDialog>)}
    </div>
);}
 
export default ScheduleCalendar;