import axios from 'axios'
import TokenService from './TokenService';
import UserService from './UserService';
import { isExpired } from 'react-jwt';

console.log(isExpired(TokenService.getAccessToken()))
const axiosApiResponseInterceptor = axios.create();
    
axiosApiResponseInterceptor.interceptors.request.use(
     (config) => {

      const token = TokenService.getAccessToken();

      config.headers = {
        'Authorization': `Bearer ${token}`,
      };

      return config;
    },
    error => {
      return Promise.reject(error);
    }
);

// Response interceptor for the response from the API
axiosApiResponseInterceptor.interceptors.response.use(

  (response) => {
    return response
  },
  async(err) => {
    console.log('any string'),

    console.log('Error from interceptor', err);

    const originalConfig = err.config;
    if(isExpired(TokenService.getAccessToken())){
      
      originalConfig._retry = true;

      try{
        debugger
        
        const refreshTokenPromise = UserService.refreshToken(TokenService.getRefreshToken())

        console.log(refreshTokenPromise)
        const {token} = refreshTokenPromise.data;



        TokenService.setAccessToken(token);
      }
      catch(error){
        return Promise.reject(error)
      }
    }
    return Promise.reject(err)
  }
) 

export default axiosApiResponseInterceptor