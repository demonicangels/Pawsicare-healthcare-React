import userI from '../assets/images/userI.png'
import searchI from '../assets/images/searchI.jpg'


const Header = () => {
    return ( 
        <header>
            <div className="header">
                <form className='searchFunction' method='post'>
                    <input type='text' placeholder='Search...'/>
                        <img src={searchI} className='search-icon' alt='icon'/>
                </form>
                <a href="/" className="header">Pawsicare</a>
                <img src={userI} className="account-logo" alt='logo'/>
            </div>

        </header>
   
     );
}
 
export default Header;