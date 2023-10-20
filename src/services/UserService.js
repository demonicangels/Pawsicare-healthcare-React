import axios from 'axios';


const hostname = 'http://localhost:8080'

const loginUser = (email, password) => {
    return axios.post(`${hostname}/login`,{
        email,
        password
    })
    .then(response => response.data)
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