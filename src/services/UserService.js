import axios from 'axios';
import TokenService from './TokenService';

const hostname = 'http://localhost:8080'

const loginUser = (email, password) => {
    
    return axios.post(`${hostname}/login`,{
        email,
        password
    })
    .then(response => response.data.accessToken)
    .then(accessToken => TokenService.setAccessToken(accessToken))
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
const getClient = (usrId) => {
    return axios.get(`${hostname}/clients`, usrId)
    .then(response => response.data)
    .then(TokenService.setAxiosHeaders)
}
const getDoctor = (usrId) => {
    return axios.get(`${hostname}/doctors`, usrId)
    .then(response => response.data)
    .then(TokenService.setAxiosHeaders)
}

export default {
    loginUser,
    createClient,
    createDoctor,
    getClient,
    getDoctor,
};