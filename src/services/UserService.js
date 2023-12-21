import TokenService from './TokenService';
import axiosApiResponseInterceptor from './AxiosResponseInterceptor';
import axios from 'axios';

const hostname = 'http://localhost:8080'

const loginUser = (email, password) => {

    return axios.post(`${hostname}/auth`,{
        email,
        password
    })
    .then(response => {
        TokenService.setAccessToken(response.data.accessToken)
        TokenService.saveRefreshToken(response.data.refreshToken)

        console.log(TokenService.getAccessToken())
        console.log(TokenService.getRefreshToken())
    })
    .catch(error => {
        console.log('Error:', error.message);
        return false;
    });
}
const refreshToken = (token) => {

    axios.post(`${hostname}/auth/refreshToken`, {token, skipAuthorization: true })
    .then(response => {
        console.log(response.data.accessToken)
        TokenService.setAccessToken(response.data.accessToken)
    })
    .catch(error => {
        console.log('Error trying to refresh the token', error.message);
    })
}
const logout = (token) => {
    axios.post(`${hostname}/auth/logout`, {token, skipAuthorization: true})
    .then(response => console.log(response.data))
    .catch(error => console.error('Error during logout:', error));
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
     
    return axiosApiResponseInterceptor.get(`${hostname}/clients`, { params: { id: usrId } })
    .then(response => response.data)
    .catch(err => {
        console.error('Error getting client:', err);
        console.log('Error message:', err.message);
    });
}
const getDoctor = (usrId) => {
    return axiosApiResponseInterceptor.get(`${hostname}/doctors`, { params: { id: usrId } })
    .then(response => response.data)
    .catch(err => console.log('Error getting client', err.message))
}
const getAllClients = () => {
    return axiosApiResponseInterceptor.get(`${hostname}/clients`)
    .then(response => response.data)
    .catch(err => console.log('Error getting all clients', err.message))
}

export default {
    loginUser,
    createClient,
    createDoctor,
    getClient,
    getAllClients,
    getDoctor,
    refreshToken,
    logout
};