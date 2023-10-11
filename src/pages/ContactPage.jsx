import { useState } from 'react';
import '../css/ContactPage.css'
import sendMail from '../services/EmailService';

const ContactForm = () => {



//     const nodemailer = require('nodemailer');

//     const transporter = nodemailer.createTransport({
//     host : "smtp.elasticemail.com",
//     port: 465,
//     secure: true,
//     auth: {
//         user: 'az@mail.com',
//         pass: '33BBBC6E99A044DD9502108A63E0303C04C9'
//     }
//     });

//     async function send(e) {
//         e.preventDefault();
    
//     const info = await transporter.sendMail({
//         To : 'areliaherondale@gmail.com',
//         From : email,
//         Subject : "Contact form PawsiCare message",
//         Body : message,
//     });
// }


    // const sendEmail = (e) => {
    //     e.preventDefault();

    //     Email.send({
    //         Host : "smtp.elasticemail.com",
    //         Username : "az@gmail.com",
    //         Password : "33BBBC6E99A044DD9502108A63E0303C04C9",
    //         To : 'areliaherondale@gmail.com',
    //         From : email,
    //         Subject : "Contact form PawsiCare message",
    //         Body : message }).then(
    //            msg => alert(msg)
    //         );
    // }

    const [email,setEmail] = useState('');
    const [message, setMessage] = useState('');

    const emailChange = (e) => {
        setEmail(e.currentTarget.value);
    }

    const msgChange = (e) =>{
        setMessage(e.currentTarget.value);
    }

    return (  
        <div className='content'>
            <form className="contactForm" >
                <div className='formCont'>
                    <h1>Contact us</h1>
                    <input type="email" name="em" placeholder="Enter your email" onChange={emailChange}/>
                    <textarea type="text" name="msg" placeholder="Your comment or message" onChange={msgChange}/>
                    <button type="submit" name='contactbtn' onClick={sendMail(email,message)}>Submit</button>
                </div>
            </form> 
        </div>
    );
}

 
export default ContactForm;