import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faUser,faSignOut,faComments,faBars,faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/Header.css'
import TokenService from '../services/TokenService'
import UserService from '../services/UserService'



const Header = ({isDarkMode}) => {   

    const [isLoggedIn, setIsLoggedIn] = useState(TokenService.getAccessToken() !== null);
    const [sideNavWidth,setSideNavWidth] = useState(0);
    const [sideNavMarginRight, setSideNavMarginRight] = useState(0)
    const [showSideNav, setShowSideNav] = useState(false);
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
        setShowSideNav(false)
        setIsLoggedIn(false)
        sessionStorage.setItem("needsReload", true);
        navigate('/')
    }
    const openChat = () => {
        navigate('/chat')
    }
    const openSideNav = () => {
        setShowSideNav(true)
        setSideNavWidth(250)
        setSideNavMarginRight(250)
    }
    const closeSideNav = () => {
        setShowSideNav(false)
        setSideNavWidth(0)
        setSideNavMarginRight(0)
    }
    const handleRedirectToProfile = () =>{
        //under construction
    }
    const handleDeleteAccount = () =>{
        const userId = TokenService.getClaims().userId
        const token = TokenService.getAccessToken()

        const response = UserService.deleteUserAccount(userId,token)

        if(response){
            UserService.logout(TokenService.getRefreshToken())
            TokenService.clear()
    
            setShowSideNav(false)
            sessionStorage.setItem("needsReload",true)
            navigate('/')
        }
    }

    return ( 
        <header>
            <div className="header">
                <form className='searchFunction' method='post'>
                    <input type="text" placeholder="Search.." name="search"/>
                    <button type="submit" name='searchbtn'><FontAwesomeIcon icon={faSearch} style={iconStyle()} /></button>
                </form>
                <a href="/" className="header" style={headerTextStyle()}>Pawsicare</a>
                {isLoggedIn ? ( 
                    <>
                        <i onClick={openChat} className='chatBtn'><FontAwesomeIcon icon={faComments} style={iconStyle()}/></i>
                        <i onClick={openSideNav} className='sideNavIcon'><FontAwesomeIcon icon={faBars} style={iconStyle()} /></i>
                    </>

                ) : <a href='/login' className='account-logo'><FontAwesomeIcon icon={faUser} /></a>}
                {showSideNav && (
                    <div className='sideNav'  style={{ width: `${sideNavWidth}px`, marginRight: `${sideNavMarginRight}px`}}>
                        <div className='sideNavButtons'>
                            <button onClick={handleRedirectToProfile} className='accountBtn'> 
                                My account
                            </button>
                            <button onClick={handleDeleteAccount} className='deleteBtn'> 
                                Delete account
                            </button>
                            <button onClick={handleLogout} className='logoutBtn'> 
                                Logout
                            </button>
                        </div>
                        <i onClick={closeSideNav} className='closeBtn'> 
                            <FontAwesomeIcon icon={faXmark} style={iconStyle()} title='close'/>
                        </i>
                    </div>
                )}
                
                
                
            </div>
        </header>
     );
}
 
export default Header;