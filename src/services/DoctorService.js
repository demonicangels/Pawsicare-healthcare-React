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
    debugger
    return axiosApiResponseInterceptor.get(`${hostname}/doctors/fields`, {params: field })
    .then(response => response.data)
    .catch(error => {
        console.log("Error: ", error.message)
    })
}

const getDoctorById = (id, token) =>{
    debugger
    return axiosApiResponseInterceptor.get(`${hostname}/doctors/docInfo`, {params: {
        id: id,
        token: token
    }})
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


   