import axios from 'axios';
import TokenService from './TokenService';

const hostname = 'http://localhost:8080'

const loginUser = (email, password) => {
    return axios.post(`${hostname}/login`,{
        email,
        password
    })
    .then(response => {
        const accessToken = response.data.accessToken;
        TokenService.setAccessToken(accessToken);
        return true;
    })
    .catch(error => {
        console.error('Error:', error.message);
        return false;
    });
}
const createClient = (data) => {
    return axios.post(`${hostname}/clients`, data)
    .then(response => response.data)
} 
const createDoctor = (data) => {
    return axios.post(`${hostname}/doctors`, data)
    .then(response => response.data)
}
export default {
    loginUser,
    createClient,
    createDoctor
};