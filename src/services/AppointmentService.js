import axios  from "axios";

const hostname = 'http://localhost:8080'

const getAppointments = (userId) => {
    return axios.get(`${hostname}/appointments`, { params: { userId } })
    .then(response => response.data.appointments)
    .catch(error => {
        console.error('Error:', error.message)});
}
 
export default {
    getAppointments,
};