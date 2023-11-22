import '../css/ContactPage.css'
import mail from '../services/EmailService';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ContactForm = () => {

    const {register, handleSubmit, formState: {errors}} = useForm()

    const sendEmail = (emailData) => {

        console.log(emailData)

        try{

            mail.sendMail(emailData)
            .then(() => {
                toast.success('Successfully sent email. Thank you!',{
                    position: toast.POSITION.TOP_RIGHT
                })
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                toast.error('Failed to send email. Please try again.', {
                    position: toast.POSITION.TOP_RIGHT
                });
            });

            
        }catch(er){
            console.log(er);
        }

    }

    return (  
        <div className='content'>
            <form className="contactForm" onSubmit={handleSubmit(sendEmail)} >
                <div className='formCont'>
                    <h1 className='box-text'>Contact us</h1>
                    <input type="text" name="userEmail" placeholder="Enter your email" {...register('userEmail', {required: true,  pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i})}/>
                    {errors.userEmail && <p> Please enter a valid email address. </p>}
                    <textarea type="text" name="message" placeholder="Your comment or message" {...register('message', {required: true})}/>
                    {errors.message && <p> Please fill in your question/review in the text box. </p>}
                    <button type="submit" name='contactbtn'>Submit</button>
                </div>
            </form> 
            <ToastContainer />
        </div>
    );
}

 
export default ContactForm;