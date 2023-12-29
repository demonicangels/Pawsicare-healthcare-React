import axios from 'axios';
import axiosApiResponseInterceptor from './AxiosResponseInterceptor';

const hostname = 'http://localhost:8080'


const getPetsByOwnerId = (id, token) => {
    return axiosApiResponseInterceptor.get(`${hostname}/pets`,{params: {
      ownerId: id,
      token: token
  }})
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

const deletePet = (id, userToken) => {
    try {
        const response = axiosApiResponseInterceptor.delete(`${hostname}/pets`, {
          params: {
            id: id,
            token: userToken,
          }
        }).then(res => {
          console.log('Data from delete request',res.data)
        });

        if (response) {
          console.log('Pet deleted successfully');
        } else {
          console.error('Error deleting pet: Invalid response format', response);
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error deleting pet:', error);
        throw error;
      }
}

const updatePet = (updatedPet) => {
  try {
    const response = axiosApiResponseInterceptor.put(`${hostname}/pets`, updatedPet)
    .then(res => console.log(res.data.updatedPet))
    .catch(e => console.log('Promise of updating pet error', e))
  }catch(error){
    console.log('Error updating pet', error);
  }
}

export default {
    getPetsByOwnerId,
    registerPet,
    deletePet,
    updatePet
}