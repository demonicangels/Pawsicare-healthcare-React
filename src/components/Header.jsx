import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser,faSignOut } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/Header.css'
import TokenService from '../services/TokenService'
import UserService from '../services/UserService'



const Header = ({isDarkMode}) => {   

    const [isLoggedIn, setIsLoggedIn] = useState(TokenService.getAccessToken() !== null);
    const navigate = useNavigate();


    const headerTextStyle = () => ({
        color: isDarkMode ? 'white' : 'black',
    });
    const iconStyle = () => ({
        color: isDarkMode ? 'white' : 'blue' 
    })
    const handleLogout = () => {

        UserService.logout(TokenService.getRefreshToken())
        TokenService.clear()
        setIsLoggedIn(false)
        navigate('/')

    }
    return ( 
        <header>
            <div className="header">
                <form className='searchFunction' method='post'>
                    <input type="text" placeholder="Search.." name="search"/>
                    <button type="submit" name='searchbtn'><FontAwesomeIcon icon={faSearch} style={iconStyle()} /></button>
                </form>
                <a href="/" className="header" style={headerTextStyle()}>Pawsicare</a>
                <a href='/login' className='account-logo'><FontAwesomeIcon icon={faUser} /></a>
                {isLoggedIn ? ( <i onClick={handleLogout} className='logoutBtn'> <FontAwesomeIcon icon={faSignOut} style={iconStyle()} /></i> ) : null}
                
            </div>
        </header>
     );
}
 
export default Header;