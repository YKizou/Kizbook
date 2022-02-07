import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Rightbar from '../components/Rightbar'
import Topbar from '../components/Topbar'
import { AuthContext } from '../context/AuthContext'
const Home = () => {
  const user = useContext(AuthContext)
  console.log("Welcome", user)
  return (
    <>
    <Topbar/>
    <div className='flex justify-between px-5'>
      <Sidebar/>
      <Feed/>
      <Rightbar user={user}/>
    </div>
    
    </>
  )
}

export default Home
