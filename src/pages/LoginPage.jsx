import '../LoginPage.css'
import { useState } from 'react';


const LoginForm = () => {
    return (
        <form className="login-form">
            <input type="text" placeholder="Enter username" name="uname" required />
            <input type="password" placeholder="Enter password" name="pass" required />
            <button type="submit" name='loginbtn'>Login</button>
        </form>
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