import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import '../css/Header.css'
import TokenService from '../services/TokenService'


const Header = ({isDarkMode}) => {   

    const headerTextStyle = () => ({
        color: isDarkMode ? 'white' : 'black',
    });
    const iconStyle = () => ({
        color: isDarkMode ? 'white' : 'blue' 
    })
    
    return ( 
        <header>
            <div className="header">
                <form className='searchFunction' method='post'>
                    <input type="text" placeholder="Search.." name="search"/>
                    <button type="submit" name='searchbtn'><FontAwesomeIcon icon={faSearch} style={iconStyle()} /></button>
                </form>
                <a href="/" className="header" style={headerTextStyle()}>Pawsicare</a>
                {TokenService.getAccessToken() !== null ? ( <a onClick={TokenService.clear()}> Logout</a> ) : <p> </p>}
                <a href='/login' className='account-logo'><FontAwesomeIcon icon={faUser} /></a>
            </div>
        </header>
     );
}
 
export default Header;