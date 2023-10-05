import './App.css'
import Home from './pages/HomePage'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Login from './pages/LoginPage'
import About from './pages/AboutusPage'
import Doctors from './pages/DoctorsPage'
import Navbar from './components/Navbar'
import Header from './components/Header'

function App() {

  return (
    <div className='app'>
      <Router>
            <Header/>
            <Navbar/>
          <Routes>
            <Route path='/' element= {<Home/>}/>
            <Route path='/login' element = {<Login/>}/>
            <Route path='/aboutus' element = {<About/>}/>
            <Route path='/doctors' element = {<Doctors/>}/>
          </Routes>
      </Router>
    </div>
  )
}

export default App
