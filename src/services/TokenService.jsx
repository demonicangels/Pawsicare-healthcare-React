import axios from 'axios'
import {jwtDecode} from 'jwt-decode';


const TokenService = {
    getAccessToken: () => sessionStorage.getItem("accessToken"),
    getRefreshToken: () => sessionStorage.getItem("refreshToken"),
    getClaims: () => {
        
        const token = TokenService.getAccessToken();

        if(token){
            const decodedToken = jwtDecode(token)
            return decodedToken
        }
    },
    setAccessToken: (token) => {
        sessionStorage.setItem("accessToken", token)
        //TokenService.setAxiosHeaders();
    },
    saveRefreshToken: (refreshToken) => {
        sessionStorage.setItem("refreshToken", refreshToken)
    },
    // setAxiosHeaders: () =>{
    //     const token = TokenService.getAccessToken();
  
    //     if (token) {
    //       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //     }
    // },
    clear: () => {
        sessionStorage.removeItem("accessToken")
        sessionStorage.removeItem("claims")
        sessionStorage.removeItem("refreshToken")
    }

};
 
export default TokenService