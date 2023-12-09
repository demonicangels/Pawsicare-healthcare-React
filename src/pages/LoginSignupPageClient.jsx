import '../css/LoginPage.css'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import UserService from '../services/UserService';
import {useNavigate} from 'react-router-dom';



const LoginForm = () => {

    const { register, handleSubmit, formState: {errors} } = useForm();
    const [operationStatus, setStatus] = useState(true);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        try {
            
          const loginSuccess = UserService.loginUser(data.uname, data.pass);

          console.log(loginSuccess)
      
          if (loginSuccess) {
            navigate('/doctors');
            sessionStorage.setItem("needsReload", true);
          }else {

            setStatus(false);

          }
        } catch (err) {
          console.log(err);
          setStatus(false);
        }
      };

    const handleRedirectongdoc = (event) => {
        event.preventDefault();
        
        navigate('/docportal')
    }

    return (
        <div className='page-layout'>
            <h1 className='errorMsg'>{operationStatus ? null : 'Wrong username or password. Please try again!'}</h1>
            <form  className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Enter email..." {...register("uname", {required: true, pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i})} name='uname' />
                {errors.uname && <p> Please enter a valid email! </p>}
                <input type="password" placeholder="Enter password..." {...register("pass", {required: true, minLength: 3})} name='pass' />
                {errors.pass && <p> Password must be at least 3 characters. </p>}
                <button type="submit" name='loginbtn'>Login</button>
            </form>
            <div className="doctorPortal-box">
                <h3>I am a doctor</h3>
                <p>Login/Signup now and use the advantages of PawsiCare! </p>
                <button className="btn-doctorPortal-box" onClick={handleRedirectongdoc}>Doctor Portal</button>
            </div>
        </div>
    );

}

const SignupForm = () => {

    const { register, handleSubmit, formState: {errors} } = useForm()
    const [opStatus, setStatus] = useState(true);
    const navigate = useNavigate();

    const onSubmit = async (data) => {

        console.log(data);
        const newUser = {name: `${data.uname}`, email: `${data.em}`, password: `${data.pass}` }

        try {
          const user = await UserService.createClient(newUser);
      
          if (user) {
            navigate('/profile');
          }

        } catch (err) {
          console.error(err);
        }
    };   


    const handleRedirectongdoc = (event) => {
        event.preventDefault();
        
        navigate('/docportal')
    }

    return (
        <div className='page-layout'>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <h1>{opStatus ? null : 'Something went wrong. Please try again!'}</h1>
                <input type="text" placeholder="Enter username" name="uname" {...register("uname", {required: true, minLength: 3})} />
                {errors.uname && <p> The username should be at least 3 letters long.</p>}
                <input type="text" placeholder='Enter email' name="em" {...register("em", {required: true, pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i})}/>
                {errors.em && <p> Please enter a valid email!</p>}
                <input type="password" placeholder="Enter password" name="pass" autoComplete="123" {...register("pass", {required: true, minLength: 3})} />
                {errors.pass && <p> The password should be at least 3 characters. </p>}
                <button type="submit" name='signup'>Sign Up</button>
            </form>
            <div className="doctorPortal-box">
                <h3>I am a doctor</h3>
                <p>Login/Signup now and use the advantages of PawsiCare! </p>
                <button type="submit" className="btn-doctorPortal-box" onClick={handleRedirectongdoc}>Doctor Portal</button>
            </div>
        </div>
    );
}


const Login = () => {

    const [showLogin, setLoginForm] = useState(true);

    const handleclick = (button) => {
        setLoginForm(button === 'login');
    }

    return ( 
        <>

            <div className="btn">
                <button type='submit' className={'login' + (showLogin ? " pressed": " ")} onClick={() => handleclick('login')} >Login</button>
                <button type='submit'  className={'signup' + (!showLogin ? " pressed": " ")} onClick={() => handleclick('signup')}>Signup</button>
            </div>

            {showLogin ? <LoginForm /> : <SignupForm />}
            
        </>
     );
}
 
export default Login;