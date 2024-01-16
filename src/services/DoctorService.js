import axios from "axios";
import TokenService from "./TokenService";
import axiosApiResponseInterceptor from "./AxiosResponseInterceptor";

const hostname = 'http://localhost:8080'

const getAllDoctors = () => {
    return axios.get(`${hostname}/doctors`)
    .then(response => response.data)
    .catch(err => {
        console.log('Erro loading all doctors', err)
    })
}

const getDoctorsByField = (field) =>{
    return axiosApiResponseInterceptor.get(`${hostname}/doctors/fields`, {params: field })
    .then(response => response.data)
    .catch(error => {
        console.log("Error: ", error.message)
    })
}

const getDoctorById = (id) =>{
    return axiosApiResponseInterceptor.get(`${hostname}/doctors/docInfo`, {params: {
        id: id
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


   