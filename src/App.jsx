import './App.css'
import Home from './pages/HomePage'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Login from './pages/LoginPage'
import About from './pages/AboutusPage'
import Doctors from './pages/DoctorsPage'

function App() {

  return (
    <div className='app'>
      <Router>
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
