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
    clear: () => {
        sessionStorage.removeItem("accessToken")
        sessionStorage.removeItem("claims")
        sessionStorage.removeItem("refreshToken")

    }

};
 
export default TokenService