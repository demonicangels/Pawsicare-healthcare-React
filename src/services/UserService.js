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
        return true;
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
        return true;
    })
    .catch(error => {
        console.log('Error trying to refresh the token', error.message);
        return false;
    })
}
const logout = (token) => {
    axios.post(`${hostname}/auth/logout`, {token, skipAuthorization: true})
    .then(response => console.log(response.data))
    .catch(error => console.error('Error during logout:', error));
}
const createClient = (data) => {
    return axios.post(`${hostname}/clients`, data)
    .then(response => {
        console.log(response.data)
        return true;
    })
    .catch(err => {
        console.log('Error creating doctor account', err)
        return false;
    })
} 
const createDoctor = (data) => {
    return axios.post(`${hostname}/doctors`, data)
    .then(response => {
        console.log(response.data)
        return true;
    })
    .catch(err => {
        console.log('Error creating doctor account', err)
        return false;
    })
}
const getClient = (usrId) => {
     
    return axiosApiResponseInterceptor.get(`${hostname}/clients`, { params: { id: usrId } })
    .then(response => response.data)
    .catch(err => {
        console.error('Error getting client:', err);
        console.log('Error message:', err.message);
    });
}
const getAllClients = () => {
    return axiosApiResponseInterceptor.get(`${hostname}/clients`)
    .then(response => response.data)
    .catch(err => console.log('Error getting all clients', err.message))
}
const deleteUserAccount = (userId, token) =>{
    debugger
    return axiosApiResponseInterceptor.delete(`${hostname}/auth`,{params: {
        id: userId,
        token: token
    }}).then(res => {
        console.log('Data from delete request',res.data)
        return true;
    }).catch(err => {
        console.log('Error deleting user account', err.message) 
        return false;
    })
}

export default {
    loginUser,
    createClient,
    createDoctor,
    getClient,
    getAllClients,
    refreshToken,
    logout,
    deleteUserAccount
};