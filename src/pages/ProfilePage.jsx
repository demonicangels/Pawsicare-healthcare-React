import { useState } from "react";

const Profile = () => {
    
    const userData = JSON.parse(localStorage.getItem('user'));
    console.log('User Data in Profile:', userData);

    return ( 
        <h2>Welcome to your profile, {userData.name}!</h2>  
    );
}
 
export default Profile;