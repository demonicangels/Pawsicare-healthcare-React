import axios  from "axios";
import TokenService from "./TokenService";
import axiosApiResponseInterceptor from './AxiosResponseInterceptor';

const hostname = 'http://localhost:8080'


const getAppointments = (userId) => {
    return axiosApiResponseInterceptor.get(`${hostname}/appointments`, { params: { userId } })
    .then(response => response.data.appointments)
    .catch(error => {
        console.error('Error:', error.message)});
}
 
export default {
    getAppointments,
};