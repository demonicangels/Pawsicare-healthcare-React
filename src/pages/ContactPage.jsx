import '../ContactPage.css'

const ContactForm = () => {
    return (  
        <div className='content'>
            <form className="contactForm">
                <div className='formCont'>
                    <h1>Contact us</h1>
                    <input type="email" name="em" placeholder="Enter your email..."/>
                    <textarea type="text" name="msg" placeholder="Your comment or message"/>
                    <button type="submit" name='contactbtn'>Submit</button>
                </div>
            </form> 
        </div>
    );
}
 
export default ContactForm;