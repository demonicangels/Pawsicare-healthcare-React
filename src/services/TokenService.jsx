import axios from 'axios'
import {jwtDecode} from 'jwt-decode';


const TokenService = {
    getAccessToken: () => sessionStorage.getItem("accessToken"),
    getClaims: () => {
        
        const token = TokenService.getAccessToken();

        if(token){
            const decodedToken = jwtDecode(token)
            return decodedToken
        }
    },
    setAccessToken: (token) => {
        sessionStorage.setItem("accessToken", token)
        TokenService.setAxiosHeaders();
    },
    setAxiosHeaders: () =>{
        const token = TokenService.getAccessToken();
  
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
    },
    clear: () => {
        sessionStorage.removeItem("accessToken")
        sessionStorage.removeItem("claims")
    }

};
 
export default TokenService