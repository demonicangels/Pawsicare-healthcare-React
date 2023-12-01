import TokenService from "./TokenService";
import UserService from "./UserService";

const TokenRefresh = () => {
 debugger 

        const token = TokenService.getAccessToken()

        if(token){
    
          const claims = TokenService.getClaims();
    
          const tokenExpiration = claims.exp
    
          if(tokenExpiration < Date.now()){
            UserService.refreshToken(token);
          }

        }
        else{
            console.log('Token not expired yet.')
            return false;
        }
        
}

export default TokenRefresh