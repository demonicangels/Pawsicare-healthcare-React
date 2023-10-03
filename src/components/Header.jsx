import userI from '../assets/images/userI.png'
import searchI from '../assets/images/searchI.jpg'
import '../Header.css'


const Header = () => {
    return ( 
        <header>
            <div className="header">
                <form className='searchFunction' method='post'>
                    <input type='text' name="search" placeholder='Search...'/>
                        <img src={searchI} className='search-icon' alt='icon'/>
                </form>
                <a href="/" className="header">Pawsicare</a>
                <a href='/login'><img src={userI} className="account-logo" alt='logo'/></a>
            </div>

        </header>
   
     );
}
 
export default Header;