import axios from 'axios'
import TokenService from './TokenService';
import UserService from './UserService';
import { isExpired } from 'react-jwt';
import { useNavigate } from 'react-router-dom';


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

    const accessT = TokenService.getAccessToken() !== null
    const refreshT = TokenService.getRefreshToken() !== null;

    try{
      if(accessT){
        if(isExpired(TokenService.getRefreshToken())){
          window.location.href = '/login'
        }
        else{

          if(refreshT && isExpired(TokenService.getAccessToken())){
        
            originalConfig._retry = true;
      
            try{
              
              const refreshTokenPromise = UserService.refreshToken(TokenService.getRefreshToken())
      
              console.log(refreshTokenPromise)
              const {token} = refreshTokenPromise.data;
      
              TokenService.setAccessToken(token);
            }
            catch(error){
              return Promise.reject(error)
            }
          }

        }
        return Promise.reject(err)
    }
      return Promise.reject(err)
  }catch(er){
      console.log('Interceptor error', er.message);
      return Promise.reject(err)
  }
}
    
) 

export default axiosApiResponseInterceptor