import axiosApiResponseInterceptor from './AxiosResponseInterceptor';

const hostname = 'http://localhost:8080'


const getPetsByOwnerId = (id) => {
    return axiosApiResponseInterceptor.get(`${hostname}/pets`, {params: {ownerId: id}})
    .then(response => response.data)
    .catch(error => {
        console.log('Error: ', error.message)
    })
}

const registerPet = (data) =>{
    return axiosApiResponseInterceptor.post(`${hostname}/pets`, data)
    .then(response => response.data)
    .catch(error => {
        console.log('Error: ',error.message)
    })
}

export default {
    getPetsByOwnerId,
    registerPet
}