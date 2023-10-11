import axios from 'axios';

const hostname = 'http://localhost:8080'

const loginUser = (email, password) => {
    return axios.post(`${hostname}/login`,{
        email,
        password
    })
    .then(response => response.data)
}
 
export default {
    loginUser 
};