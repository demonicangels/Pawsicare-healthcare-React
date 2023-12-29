import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import calendarI from '../assets/images/calendarIcon.png'
import chatI from '../assets/images/chatIcon.png'
import '../css/DoctorPortal.css'
import UserService from '../services/UserService'
import { useForm } from 'react-hook-form'

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

    const { register, handleSubmit, formState: {errors} } = useForm()
    const navigate = useNavigate()


    const redirectToSection = () =>{
        location.href = "#section3"
    }

    const onSubmit = async (data) =>{

        debugger
        console.log(data)

        const doctorUser = {name: `${data.uname}`, email: `${data.em}`, password: `${data.pass}`, field: `${data.field}`}
         
        try{
            const doc = await UserService.createDoctor(doctorUser)

            if(doc === true){
               const login = await UserService.loginUser(doctorUser.email, doctorUser.password)

               if(login === true){
                    sessionStorage.setItem('needsReload', true)
                    navigate('/')
               }
                
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
                    <form className="login-form" onSubmit={handleSubmit(onSubmit)} method='POST'>
                        <input type="text" placeholder="Enter username" name="uname" {...register("uname", {required: true, minLength: 3})} />
                        {errors.uname && <p> The username should be at least 3 letters long.</p>}
                        <input type="text" placeholder='Enter email' name="em" {...register("em", {required: true, pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i})}/>
                        {errors.em && <p> Please enter a valid email!</p>}
                        <input type='text' placeholder='Enter the field you work in' name='field' {...register("field", {required: true, minLength: 8})}/>
                        {errors.field && <p> The field you work in should contain at least 8 letters. </p>}
                        <input type="password" placeholder="Enter password" name="pass" autoComplete="123" {...register("pass", {required: true, minLength: 3})} />
                        {errors.pass && <p> Password must be at least 3 characters. </p>}
                        <button type="submit" id='signupdoc'>Sign Up</button>
                    </form>
                </div>
            </div>   
        </div>
     );
}
 
export default DoctorPortal;