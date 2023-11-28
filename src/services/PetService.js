import axios from "axios";
import TokenService from "./TokenService";

const hostname = 'http://localhost:8080'

TokenService.setAxiosHeaders()

const getPetsByOwnerId = (id) => {
    return axios.get(`${hostname}/pets`, {params: {ownerId: id}})
    .then(response => response.data)
    .catch(error => {
        console.log('Error: ', error.message)
    })
}

const registerPet = (data) =>{
    return axios.post(`${hostname}/pets`, data)
    .then(response => response.data)
    .catch(error => {
        console.log('Error: ',error.message)
    })
}

export default {
    getPetsByOwnerId,
    registerPet
}