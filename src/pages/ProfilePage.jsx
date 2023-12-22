import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import TokenService from "../services/TokenService";


const Profile = () => {

    const [client,setClient] = useState(null)

    const clientData = () => {

        const userId = TokenService.getClaims().userId

        UserService.getClient(userId).then(data => setClient(data))
        console.log(client)
    }

    useEffect(() => {
        clientData()
    },[])

    // <nav class="navigation">
	// 			<a href="#">
	// 				<i class="ph-browsers"></i>
	// 				<span>Dashboard</span>
	// 			</a>
	// 			<a href="#">
	// 				<i class="ph-check-square"></i>
	// 				<span>Scheduled</span>
	// 			</a>
	// 			<a href="#">
	// 				<i class="ph-swap"></i>
	// 				<span>Transfers</span>
	// 			</a>
	// 			<a href="#">
	// 				<i class="ph-file-text"></i>
	// 				<span>Templates</span>
	// 			</a>
	// 			<a href="#">
	// 				<i class="ph-globe"></i>
	// 				<span>SWIFT</span>
	// 			</a>
	// 			<a href="#">
	// 				<i class="ph-clipboard-text"></i>
	// 				<span>Exchange</span>
	// 			</a>
	// 		</nav>
    
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