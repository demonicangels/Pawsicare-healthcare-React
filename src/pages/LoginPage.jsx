import '../css/LoginPage.css'
import { useEffect, useState } from 'react';
import UserService from '../services/UserService';
import { Navigate, Router } from 'react-router-dom';



const LoginForm = () => {

    const [email, setEmail] = useState("smth");
    const [password, setPassword] = useState("22222");
    const [isUserPresent, setUser] = useState(null);

    const emailChange = (e) => {
        
        setEmail(e.target.value)
    } 
    const passChange = (e) => {
        
        setPassword(e.target.value)
    }

    const handleLogin = (event) =>{
        event.preventDefault();
        setUser( UserService.loginUser(email,password)
        .then(data => {
            console.log(data);
            setUser(data ? JSON.stringify(data) : null);
            window.location.href = '/'
        })
        .catch(err => console.log(err), alert('Wrong login credentials')))
    }

    return (
        <>
            <form className="login-form">
                <input type="text" placeholder="Enter username" name="uname" required onChange={emailChange}/>
                <input type="password" placeholder="Enter password" name="pass" required onChange={passChange}/>
                <button type="submit" name='loginbtn' onClick={handleLogin}>Login</button>
            </form>
        </>
    );

}

const SignupForm = () => {
    return (
        <form className="login-form">
            <input type="text" placeholder="Enter username" name="uname" required />
            <input type="text" placeholder='Enter email' name="em" required />
            <input type="password" placeholder="Enter password" name="pass" required />
            <button type="submit" name='loginbtn'>Sign Up</button>
        </form>
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