import axios from "axios";

const hostname = 'http://localhost:8080'

const getAllDoctors = () => {
    return axios.get(`${hostname}/doctors`)
    .then(response => response.data)
}
 
export default {
    getAllDoctors
};


   