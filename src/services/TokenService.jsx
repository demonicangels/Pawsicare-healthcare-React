import axios from 'axios';

const userData = {
    accessToken: undefined,
    claims: undefined,
}

const TokenService = {
    getAccessToken: () => userData.accessToken,
    getClaims: () => {
        if(!userData.claims){
            return undefined;
        }
        return userData.claims;
    },
    getUserId: () => sessionStorage.getItem("userId"),
    setAccessToken: async (token) => {
        const jwtDecode = (await import('jwt-decode')).default;
        const decodedToken = jwtDecode(token)
        sessionStorage.setItem("userId", decodedToken.sub)
        userData.claims = decodedToken
        return decodedToken
    },
    setAxiosHeaders: (axios) =>{

        const token = TokenService.getAccessToken();
  
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        return axios;
    },
    clear: () => {
        userData.accessToken = undefined,
        userData.claims = undefined,
        sessionStorage.removeItem("userId")
    }

};
 
export default TokenService