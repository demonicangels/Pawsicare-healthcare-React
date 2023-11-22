import { Navigate } from "react-router-dom"
import TokenService from "./TokenService"

function AuthRequired({children}){
    const isLoggedIn = TokenService.getAccessToken() !== null
    console.log(isLoggedIn)
    return isLoggedIn ? <>{children}</> : <Navigate to="/login"/>
}
 
export default AuthRequired
