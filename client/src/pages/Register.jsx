import React, {useRef} from 'react'
import { Link } from 'react-router-dom'
import { loginCall } from '../apiCalls';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const username = useRef(); 
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password.current.value !== passwordAgain.current.value){
      console.log(password.current.value)
      console.log(passwordAgain.current.value)

      passwordAgain.current.setCustomValidity("Passwords don't match.")
    } else { 
      const user = {
        username : username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      try{
        await axios.post("http://localhost:8800/api/auth/signup", user)
        history("/")
      } catch(err){
        console.log(err)
      }
      
      

    }
    console.log(email.current.value)
    // loginCall({email:email.current.value, password:password.current.value}, 
    //   dispatch
    // );
  };

  
  return (
    <div className='register w-screen h-screen flex justify-center align-center bg-slate-100'>
      <div className="registerWrapper flex flex-row  w-2/3 h-2/3 self-center">
        <div className="registerLeft flex flex-col w-1/2 pr-10">
            <div className="divForDesignOnly h-2/6"></div>
            <code className="registerLogo text-4xl font-bold">KizBook</code>
            <code className="registerDesc text-2xl">Connect with friends and the world around you on Kizbook.</code>
        </div>
        <form className="registerRight flex flex-col w-1/2 justify-center align-center bg-white" onSubmit={handleSubmit}>
            <input type="text" className="usernameInput h-1/6 p-3 m-3 border-2 border-gray-400 rounded-2xl" required placeholder='Username' ref={username}/>
            <input type="email" className="emailInput h-1/6 p-3 m-3 border-2 border-gray-400 rounded-2xl" required placeholder="Email" ref={email}/>
            <input type="password" className="passwordInput h-1/6 p-3 m-3 border-2 border-gray-400 rounded-2xl" required placeholder='Password' ref={password}/>
            <input type="password" className="passwordAgainInput h-1/6 p-3 m-3 border-2 border-gray-400 rounded-2xl" required placeholder='Password Again' ref={passwordAgain} />
            <button type="submit" className="signUp h-1/6 p-3 m-3 border-2 bg-blue-500 rounded-2xl text-white font-bold text-xl">Sign Up</button>
            <Link to="/login" className='h-1/6 w-1/2 self-center'>
              <button className="register p-3 m-3 border-2 bg-green-500 rounded-2xl text-xl text-white">Log into Account</button>
            </Link>
        </form>
      </div>
    </div>
  )
}

export default Register
