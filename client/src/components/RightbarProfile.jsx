import axios from 'axios'
import React, { useEffect, useState } from 'react'


const RightbarProfile = ({user}) => {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const [listFriends, setListFriends]  = useState([])

  var userFriends = []

  

  useEffect(()=>{
    const fetchFollowings = async () => {
      console.log("test", user.followings)
      await user.followings.map( async u => {
        const res = await axios.get("/api/users/"+u)
        userFriends.push(res.data)
        userFriends.map( u => { 
          var profileUrl = "/profile/" + u._id
          setListFriends(oldArray=>[...oldArray,
          <div key={u._id} className="flex flex-col pt-3">
          <a href={profileUrl}><img src={PF+ u.profilePicture} alt="" className="topbarImg cursor-pointer h-28 w-28 rounded object-cover"/></a>
          <code className="font-bold text-sm">{u.username}</code>
          </div>
        ]) 
        })
      })
    };
    fetchFollowings()
  }, [user])


  return (
    <div className='rightbarProfile pt-5 w-1/4 overflow-y-scroll pl-2'>
      <div className="userinfos flex flex-col pb-6">
        <code className='userInformation font-bold mb-2'>User Information</code>
        <code className='userCity'>City: {user.city}</code>
        <code className='userFrom'>From: {user.from}</code>
      </div>

      <div className="userFriends">
        <code className='userFriends font-bold'>User Friends</code>
        <div className="listuserFriends grid grid-cols-2">
          { listFriends ? listFriends : null } 
        </div>
      </div>


    </div>
  )
}

export default RightbarProfile
