import axios  from "axios";
import TokenService from "./TokenService";
import axiosApiResponseInterceptor from './AxiosResponseInterceptor';

const hostname = 'http://localhost:8080'


const createAppointment = (appointment) =>{
    return axiosApiResponseInterceptor.post(`${hostname}/appointments`, appointment)
    .then(response => response.data)
    .catch(error => {
        console.log('Error creating appointment', error.message)
    })
}

const getAppointments = (userId) => {
    return axiosApiResponseInterceptor.get(`${hostname}/appointments`, { params: { userId } })
    .then(response => response.data.appointments)
    .catch(error => {
        console.error('Error getting users appointments:', error.message)});
}

const addEmptyBookings = (doctorId) =>{
    
    const today = new Date()
    const startOfWeek = new Date(today.setDate(today.getDate() - (today.getDay() - 1)));
    const dates = [];

    for(let i = 0; i < 5; i++){
        const currentDate = new Date(startOfWeek);
        currentDate.setDate(startOfWeek.getDate() + i);

        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
            dates.push(currentDate.toISOString().split('T')[0]);
        }
    }

    const emptyBookings = dates.map((date) => (

        {
            date: date,
            startTime: '600',
            endTime: '660',
            doctorId: doctorId,
        }

    ))

    return emptyBookings;
}

const createSchedule = (schedulePreferences) => {
    return axiosApiResponseInterceptor.post(`${hostname}/appointments/schedule`, schedulePreferences)
    .then(response => response.data)
    .catch(err => console.log('Error creating schedule', err))
}
 
export default {
    getAppointments,
    addEmptyBookings,
    createAppointment,
    createSchedule
    
};