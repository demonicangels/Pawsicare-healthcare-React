import axios  from "axios";
import TokenService from "./TokenService";

const hostname = 'http://localhost:8080'

TokenService.setAxiosHeaders()

const getAppointments = (userId) => {
    return axios.get(`${hostname}/appointments`, { params: { userId } })
    .then(response => response.data.appointments)
    .catch(error => {
        console.error('Error:', error.message)});
}
 
export default {
    getAppointments,
};