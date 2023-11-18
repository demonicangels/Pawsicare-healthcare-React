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
import { useState, useEffect } from 'react'

function App() {

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {

    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';

    return () => {
      document.body.className = '';
    };
  }, [isDarkMode]);

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
            <Route path='/contacts' element = {<ContactForm/>}/>
            <Route path='/docportal' element = {<DoctorPortal/>}/>
            <Route path='/profile' element = {<Profile/>}/>
            <Route path='/appointments' element = {<AppCalendar/>}/>
          </Routes>
      </Router>
    </div>
  )
}

export default App
