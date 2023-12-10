import axios from "axios";
import TokenService from "./TokenService";
import axiosApiResponseInterceptor from "./AxiosResponseInterceptor";

const hostname = 'http://localhost:8080'

const getAllDoctors = () => {
    return axios.get(`${hostname}/doctors`)
    .then(response => response.data)
}

const getDoctorsByField = (field) =>{
    console.log(field)
    return axios.get(`${hostname}/doctors`, {params: { field: field }})
    .then(response => response.data)
    .catch(error => {
        console.log("Error: ", error.message)
    })
}

const getDoctorById = async (id) =>{
    debugger
    console.log(id)
    return await axiosApiResponseInterceptor.get(`${hostname}/doctors`, {params: {id: id}})
    .then(response => response.data)
    .catch(error => {
        console.log('Error: ', error.message)
    })
}
export default {
    getAllDoctors,
    getDoctorsByField,
    getDoctorById
};


   