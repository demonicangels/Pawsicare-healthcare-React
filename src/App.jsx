import './css/App.css'
import Home from './pages/HomePage'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Login from './pages/LoginSignupPageClient'
import About from './pages/AboutusPage'
import Doctors from './pages/DoctorsPage'
import Navbar from './components/Navbar'
import Header from './components/Header'
import ContactForm from './pages/ContactPage'
import DoctorPortal from './pages/DoctorPortal'
import Profile from './pages/ProfilePage'
import AppCalendar from './pages/AppointmentCalendar'
import MyPets from './pages/PetsPage'
import { useState, useEffect } from 'react'
import TokenService from './services/TokenService'
import AuthRequired from './services/AuthRequired'
import DocProfile from './pages/DoctorProfile'
import Chat from './pages/Chat'
import ChatRoom from './pages/ChatRooom'


function App() {

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {

    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';

    return () => {
      document.body.className = '';
    };
    
  }, [isDarkMode]);

  useEffect(() =>{
    
    if(TokenService.getAccessToken() !== null){
      console.log('#1', TokenService.getAccessToken())
      TokenService.setAccessToken(TokenService.getAccessToken())
    }
    
  },[])

  const token = TokenService.getAccessToken();
  const isLoggedIn = token !== null;

  let userRole = null;
  if(isLoggedIn){
    const claims = TokenService.getClaims();
    userRole = claims.role;
  }

  return (
    <div className='app'>
      <Router>
            <Header isDarkMode = {isDarkMode} /> 
            <Navbar isDarkMode = {isDarkMode} setIsDarkMode = {setIsDarkMode} />
          <Routes>
            <Route path='/' element= {<Home/>}/>
            <Route path='/login' element = {<Login/>}/>
            <Route path='/aboutus' element = {<About/>}/>
            <Route path='/doctors' element = {<Doctors/>}/>
            <Route path='/contacts' element = {<AuthRequired><ContactForm/></AuthRequired>}/>
            <Route path='/docportal' element = {<DoctorPortal/>}/>
            <Route path='/profile' element = {<AuthRequired><Profile/></AuthRequired>}/>
            <Route path='/appointments' element = {<AuthRequired><AppCalendar/></AuthRequired>}/>
            <Route path='/mypets' element = {<AuthRequired>{userRole === 'Client' ? <MyPets/> : '' }</AuthRequired>}/>
            <Route path='/docprofile' element = {<DocProfile/>}/>
            <Route path='/chat' element = {<AuthRequired><Chat/></AuthRequired>}/>
          </Routes>
      </Router>
    </div>
  )
}

export default App
