import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faUser,faSignOut,faComments,faBars,faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../css/Header.css'
import TokenService from '../services/TokenService'
import UserService from '../services/UserService'
import { useNotificationContext } from "../components/NotificationContext.jsx";
import DoctorService from '../services/DoctorService.js'



const Header = (props) => {   

    const [isLoggedIn, setIsLoggedIn] = useState(TokenService.getAccessToken() !== null);
    const [sideNavWidth,setSideNavWidth] = useState(0);
    const [sideNavMarginRight, setSideNavMarginRight] = useState(0)
    const [showSideNav, setShowSideNav] = useState(false);
    const [user, setUser] = useState(null);
    const [claims, setClaims] = useState(TokenService.getClaims());
    const navigate = useNavigate();
    const location = useLocation();

    const headerTextStyle = () => ({
        color: props.isDarkMode ? 'white' : 'black',
    });
    const iconStyle = () => ({
        color: props.isDarkMode ? 'white' : 'blue' 
    })

    
    const { updateNotifications, notifications } = useNotificationContext();

    useEffect(() => {
      const notis = props.notification === null || props.notification === undefined ? "" : props.notification.getNotifications(); 
      updateNotifications(notis);
    }, [props.notification, notifications]);
  
    const notificationsArray = notifications;

    useEffect(() =>{
        const fetchData = async () => {
            try {
              if (claims.role === "Client") {
                const response = await UserService.getClient(claims.userId, TokenService.getAccessToken());
                setUser(response.client);
              } else {
                const doctor = await DoctorService.getDoctorById(claims.userId, TokenService.getAccessToken());
                setUser(doctor);
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
          };
        
        fetchData();
    },[])


    const handleLogout = () => {
        UserService.logout(TokenService.getRefreshToken())
        TokenService.clear()
        setShowSideNav(false)
        setIsLoggedIn(false)
        sessionStorage.setItem("needsReload", true);
        navigate('/')
    }
    const openChat = () => {
        props.notification.clearNotis();
        sessionStorage.setItem("needsReload", true)
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
        const userRole = TokenService.getClaims().role

        if(userRole === 'Doctor'){
            navigate('/docprofile')
        }
        else{
            navigate('/profile')
        }
    }

    const redirectToProfile = () =>{

        if(user.role === "Client"){
            navigate('/profile')
        }
        else{
            navigate('/docprofile')
        }
    }

    const handleDeleteAccount = async () =>{
        const userId = TokenService.getClaims().userId
        const token = TokenService.getAccessToken()

        const response = await UserService.deleteUserAccount(userId,token)

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
                {/* <form className='searchFunction' method='post'>
                    <input type="text" placeholder="Search.." name="search"/>
                    <button type="submit" name='searchbtn'><FontAwesomeIcon icon={faSearch} style={iconStyle()} /></button>
                </form> */}
                <a href="/" className="header" style={headerTextStyle()}>Pawsicare</a>
                {isLoggedIn ? ( 
                    <>
                        <i className={`${notificationsArray && notificationsArray.length === 0 ? 'notificationIcon.small' : 'notificationIcon'}`}>{notificationsArray && notificationsArray.length > 0 && notificationsArray.length}</i>
                        <i onClick={openChat} className='chatBtn'><FontAwesomeIcon icon={faComments} style={iconStyle()}/></i>
                        {location.pathname === "/profile" || location.pathname === "/docprofile" && (user && user.doctor && user.doctor.role === "Doctor") ? (<i  data-testid="cypress-logout-sideNavButton" onClick={openSideNav} className='sideNavIcon'><FontAwesomeIcon icon={faBars} style={iconStyle()} /></i>) : ''}
                        <div className='account-button'>
                            <img src={user && user.role === "Client" ? 'https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' : (user && user.doctor.role === "Doctor" ? user.doctor.image : '')} onClick={redirectToProfile} title='User Account'></img>
                        </div>
                        
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
                            <button  data-testid="cypress-button-logout" onClick={handleLogout} className='logoutBtn'> 
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