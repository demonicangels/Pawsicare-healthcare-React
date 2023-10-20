import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import calendarI from '../assets/images/calendarIcon.png'
import chatI from '../assets/images/chatIcon.png'
import '../css/DoctorPortal.css'
import UserService from '../services/UserService'
import { json } from 'react-router-dom'

const icons = [
    {
        id: 1,
        Image: `${calendarI}`
    },
    {
        id:2,
        Image: `${chatI}`
    },
]

const DoctorPortal = () => {

    const [email,setEmail] = useState("smth")
    const [name,setName] = useState("ana")
    const [pass,setPassword] = useState("333")
    const [field, setField] = useState("cardi")
    const navigate = useNavigate()


    const redirectToSection = () =>{
        location.href = "#section3"
    } 

    const emailSetter = (event) =>{
        setEmail(event.target.value);
    }
    const nameSetter = (event) =>{
        setName(event.target.value)
    } 
    const passwordSetter = (event) =>{
        setPassword(event.target.value)
    } 
    const fieldSetter = (event) =>{
        setField(event.target.value)
    } 

    const doctorUser = {name: `${name}`, email: `${email}`, password: `${pass}`, field: `${field}`}

    const handleDocsignup = async (event) =>{
        event.preventDefault();
         
        try{
            const doc = await UserService.createDoctor(doctorUser)

            if(doc){
                console.log(doc)
                navigate('/')
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return ( 
        <div className="sections-layout">
            <div id="section1">
                <div id='content1'>
                    <h1 id='signuptxt'> Sign up and simplify your work! </h1>
                    <button onClick={redirectToSection} id='signupbtn'> Signup </button>
                </div>
            </div>
            <div id="section2">
                <div className="wrapper" key='advantage-cards'>
                    <h1 className='advantagetxt'>Advantages of PawsiCare system</h1>
                    <div className="advantages-box">
                        <div className="icon-box">
                            <img className="itemIconimg" src={`${calendarI}`} alt='calendar'/>
                            <h3>Online calendar</h3>
                            <p className="text"> 
                                You can put your schedule and it will be available to all clients on the platform who want to make an appointment with you and see all your apointments on the calendar.
                            </p>
                        </div>
                        <div className='space-between'>    </div>
                        <div className="icon-box">
                            <img className="itemIconimg" src={`${chatI}`} alt='chat'/>
                            <h3>Online chat</h3>
                            <p className="text"> 
                                Chat freely with your clients in need of extra information about the animal.
                            </p>
                        </div>
                    </div>   
                </div>
            </div>
            <div id='section3'>
                <div className='page-layout-section3'>
                    <h1 className='signuptxt'>Signup</h1>
                    <form className="login-form" onSubmit={(doctorUser,event) => {handleDocsignup(doctorUser,event)}} method='POST'>
                        <input type="text" placeholder="Enter name" name="uname"  onChange={nameSetter} required />
                        <input type="text" placeholder='Enter email' name="em"  onChange={emailSetter} required />
                        <input type='text' placeholder='Enter the field you work in' name='field' onChange={fieldSetter} required/>
                        <input type="password" placeholder="Enter password" name="pass" onChange={passwordSetter} required />
                        <button type="submit" id='signupdoc' onClick={handleDocsignup}>Sign Up</button>
                    </form>
                </div>
            </div>   
        </div>
     );
}
 
export default DoctorPortal;