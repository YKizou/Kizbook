import axios from 'axios';
import React, { useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { loginCall } from '../apiCalls';
import { AuthContext } from '../context/AuthContext';
import {CircularProgress} from "@mui/material"

const Login = () => {

  const email = useRef();
  const password = useRef();
  const {user, isFetching, error, dispatch} = useContext(AuthContext); 
  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall({email:email.current.value, password:password.current.value}, 
              dispatch
            );
  };
 
  // useEffect(()=>{
  //   const fetchUser = async () => {
  //     const res = await axios.post("http://localhost:8800/login")
  //     console.log(res.data)
  //   };
  //   fetchUser()
  //   }, [])
  console.log("user", user)

  return (
    <div className='login w-screen h-screen flex justify-center align-center bg-slate-100'>
      <div className="loginWrapper flex flex-row  w-2/3 h-2/3 self-center">
        <div className="loginLeft flex flex-col w-1/2 pr-10">
            <div className="divForDesignOnly h-2/6"></div>
            <code className="loginLogo text-4xl font-bold">KizBook</code>
            <code className="loginDesc text-2xl">You can create a new account or use the account below to test the application :</code>
            <br/>
            <code className="loginDesc text-2xl"><b>Email</b> : youssefkizou@gmail.com</code>
            <code className="loginDesc text-2xl"><b>Password</b> : test123</code>
        </div>
        <form className="loginRight flex flex-col w-1/2 justify-center align-center bg-white" onSubmit={handleSubmit}>
            <input type="email" className="emailInput h-1/6 p-3 m-3 border-2 border-gray-400 rounded-2xl" placeholder="Email" required ref={email} />
            <input type="password" minLength="6" className="passwordInput h-1/6 p-3 m-3 border-2 border-gray-400 rounded-2xl" placeholder='Password' required ref={password} />
            <button className="loginButton h-1/6 p-3 m-3 border-2 bg-blue-500 rounded-2xl text-white font-bold text-xl"><code>{isFetching ? <CircularProgress/> : "Log In"}</code></button>
            <button className="ForgotButton h-1/6 p-3 m-3 text-blue-500 w-1/2 self-center"><code>Forgot your password?</code></button>
            <Link to="/register" className='h-1/6 self-center'>
              <button className="signinButton p-3 m-3 border-2 bg-green-500 rounded-2xl text-xl text-white">
                <code>Create a new account</code>
              </button>
            </Link>
        </form>
      </div>
    </div>
  )
}

export default Login
