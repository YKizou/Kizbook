import React, { useContext } from 'react'
import {Search, Person, Chat, Notifications} from "@mui/icons-material"
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const Topbar = () => {

  const {user} = useContext(AuthContext)
  const PF = "/images/"
  const urlProfile = "/profile/"+user._id

  return (
    <div className='topbarContainer bg-[#262526] text-sky-50 w-full h-14 flex flex-row items-center px-5 sticky top-0 z-10'>
      <div className="topbarLeft w-1/4">
        <a href="/">
          <span className="logotext-2xl font-bold"><code>Kizbook</code></span>
        </a>
      </div>
      <div className="topbarCenter w-1/3  ">
        <div className="searchbar w-full bg-sky-50 rounded flex px-2">
          <Search className='text-black'/>  
          <input placeholder=' Search for friend, post or video' className='searchInput w-full mx-5 text-[#262526] focus:outline-none'/>
        </div>
      </div>
      <div className="topbarRight justify-between w-1/3  flex items-center">
        <div className="topbarLinks flex justify-between">
          <span className="topbarLink px-10 cursor-pointer"><code>Homepage</code></span>
          <span className="topbarLink cursor-pointer"><code>Timeline</code></span>
        </div>
        <div className="topbarIcons flex px-5 space-x-5 ">
          <div className="topbarIconItem flex cursor-pointer">
              <Person/>
              <span className="topbarIconBadge rounded flex text-xs ml-3 px-1 absolute -z-100 bg-red-600 justify-center">9</span>
          </div>
          <div className="topbarIconItem flex cursor-pointer">
              <Chat/>
              <span className="topbarIconBadge rounded flex text-xs ml-3 px-1 absolute -z-100 bg-red-600 justify-center">3</span>
          </div>
          <div className="topbarIconItem flex cursor-pointer">
              <Notifications/>
              <span className="topbarIconBadge rounded flex text-xs ml-3 px-1 absolute -z-100 bg-red-600 justify-center">1</span>
          </div>  
        </div>
        <div className='h-10 w-10 -mr-20'>
          <a href={urlProfile}>
            <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} alt="" className="topbarImg h-10 w-10 rounded-full object-cover cursor-pointer"/>
          </a>
        </div>

      </div>
    </div>
  )
}

export default Topbar
