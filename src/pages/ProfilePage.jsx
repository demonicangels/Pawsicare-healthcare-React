import { useLocation } from "react-router-dom";
const Profile = (props) => {
    const location = useLocation();

    const userData = location.state ? JSON.parse(location.state.user) : null
    return ( 
        <h1>{userData.name}</h1>    
    );
}
 
export default Profile;