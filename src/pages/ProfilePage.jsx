import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import TokenService from "../services/TokenService";
import '../css/ProfilePage.css'
import { useNavigate } from "react-router-dom";

const Profile = () => {

    const [client,setClient] = useState(null)
    const navigate = useNavigate();



	const reload = sessionStorage.getItem('needsReload')

	if(reload === "true"){
		sessionStorage.setItem('needsReload', false)
		window.location.reload()
	}

    useEffect(() => {
		const clientData = async () => {

            debugger 
    
            const userId = TokenService.getClaims().userId
    
            const response = await UserService.getClient(userId)
    
            console.log(response.data)
    
            if(response.client){
                setClient(response.client)
            }
            
        }

        clientData()
    },[])

    const redirectToPetsPage = () =>{
        navigate('/mypets')
    }

    const redirectToAppPage = () =>{
        navigate('/appointments') 
    }

    return ( 
        <div className="profile">
            <img className="profilePic" src="https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
            <div className="profile-text">
                <a> Name: {client ? client.name : ''}</a>
                <a> Email: {client ? client.email : ''}</a>
                <a> Phone number: {client ? client.phoneNumber : ''}</a>
                <a> Birthday: {client ? client.birthday : ''}</a>
            </div>
            <div className="buttons">
                <button className="myPetsPageShortcut" onClick={redirectToPetsPage}> My pets </button>
                <button className="myAppPageShortcut" onClick={redirectToAppPage}> My appointments </button>
            </div>
        </div>
    );
}
 
export default Profile;