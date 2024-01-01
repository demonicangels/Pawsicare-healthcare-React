import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import TokenService from "../services/TokenService";


const Profile = () => {

    const [client,setClient] = useState(null)

    const clientData = async () => {

		debugger 

        const userId = TokenService.getClaims().userId
		const token = TokenService.getAccessToken()

        const client = await UserService.getClient(userId,token)

		console.log(client.data)

		if(client.data){
			setClient(client.data)
		}
        
    }

	const reload = sessionStorage.getItem('needsReload')

	if(reload === "true"){
		sessionStorage.setItem('needsReload', false)
		window.location.reload()
	}

    useEffect(() => {
		debugger
        clientData()
    },[])

    return ( 
        <div className="profile">
            <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fgirl-profile&psig=AOvVaw2iQIYM6vkpGi-iLkQbIwAF&ust=1700561058234000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPi70OCp0oIDFQAAAAAdAAAAABAJ"/>
            <div className="profile-content">
                <h1>{client.name}</h1>
                <p>{client.email}</p>
            </div>
        </div>
    );
}
 
export default Profile;