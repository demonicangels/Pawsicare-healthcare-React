import userI from '../assets/images/userI.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import '../css/Header.css'


const Header = () => {
    return ( 
        <header>
            <div className="header">
                <form className='searchFunction' method='post'>
                    <input type="text" placeholder="Search.." name="search"/>
                    <button type="submit" name='searchbtn'><FontAwesomeIcon icon={faSearch} /></button>
                </form>
                <a href="/" className="header">Pawsicare</a>
                <a href='/login' className='account-logo'><FontAwesomeIcon icon={faUser} /></a>
            </div>
        </header>
     );
}
 
export default Header;