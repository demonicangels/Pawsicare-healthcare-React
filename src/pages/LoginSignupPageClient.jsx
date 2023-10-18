import '../css/LoginPage.css'
import { useEffect, useState } from 'react';
import UserService from '../services/UserService';
import {useNavigate} from 'react-router-dom';



const LoginForm = () => {

    const [email, setEmail] = useState("smth");
    const [password, setPassword] = useState("22222");
    const [isUserPresent, setUser] = useState(null);
    const [operationStatus, setStatus] = useState(true);
    const navigate = useNavigate();

    const emailChange = (e) => {
        
        setEmail(e.target.value)
    } 
    const passChange = (e) => {
        
        setPassword(e.target.value)
    }

    const handleLogin = async (event) =>{
        event.preventDefault();

        try{
            const data = await UserService.loginUser(email,password);

            if(data){
                setUser(JSON.stringify(data));
                navigate('/profile',  { state: { user: data } })
            }
            else{
                setStatus(false)
            }
        }
        catch(err){
            console.log(err), setStatus(false)
        }
    }

    const handleRedirectongdoc = (event) => {
        event.preventDefault();
        
        navigate('/docportal')
    }

    return (
        <div className='page-layout'>
            <h1 className='errorMsg'>{operationStatus ? null : 'Wrong username or password. Please try again!'}</h1>
            <form className="login-form">
                <input type="text" placeholder="Enter username" name="uname" required onChange={emailChange}/>
                <input type="password" placeholder="Enter password" name="pass" required onChange={passChange}/>
                <button type="submit" name='loginbtn' onClick={handleLogin}>Login</button>
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
    const [email,setEmail] = useState("smth")
    const [name,setName] = useState("ana")
    const [pass,setPassword] = useState("333")
    const [opStatus, setStatus] = useState(true);
    const navigate = useNavigate();


    const emailSet = (e) => {
        setEmail(e.target.value);
    }
    const nameSet = (e) => {
        setName(e.target.value);
    }
    const passwordSet = (e) => {
        setPassword(e.target.value);
    }

    const newUser = {name: `${name}`, email: `${email}`, password: `${pass}` }

         const handleSignup =  async (newUser,event) =>{
             event.preventDefault();

              try{
                const user = await UserService.createUser(newUser)
                setUser(user);
                navigate('/profile', {user})
              }
              catch(err){
                console.log(err)
                setStatus(false)
              }

            } 


    const handleRedirectongdoc = (event) => {
        event.preventDefault();
        
        navigate('/docportal')
    }

    return (
        <div className='page-layout'>
            <form className="login-form">
                <h1>{opStatus ? null : 'Something went wrong. Please try again!'}</h1>
                <input type="text" placeholder="Enter username" name="uname" required />
                <input type="text" placeholder='Enter email' name="em" required />
                <input type="password" placeholder="Enter password" name="pass" required />
                <p>{}</p>
                <button type="submit" name='loginbtn' onClick={handleSignup}>Sign Up</button>
            </form>
            <div className="doctorPortal-box">
                <h3>I am a doctor</h3>
                <p>Login/Signup now and use the advantages of PawsiCare! </p>
                <button className="btn-doctorPortal-box" onClick={handleRedirectongdoc}>Doctor Portal</button>
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