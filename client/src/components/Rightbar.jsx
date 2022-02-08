import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Rightbar = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [listFriends, setListFriends]  = useState([])
  var userFriends = []
  const PB_ADS = PF + "ad.png"
  // const PB_GIFT = PF + "gift.png"


  useEffect(()=>{
    const fetchFollowings = async () => {
      console.log(user.user)
      await user.user.followings.map( async u => {
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
    <div className='rightbar pt-5 w-1/4 overflow-y-scroll px-2'>
      {/* <div className='rightbarBirthday flex pb-7'>
        <img src={PB_GIFT} alt="" className="rightbarBirthdayImg cursor-pointer h-12 w-12"/>
        <code className="ml-4"><b>Youssef Kizou</b> and <b>3 other friends</b> have a birthday today.</code>
      </div> */}
      <img src={PB_ADS} alt="" className="rightbarAd rounded-2xl" />
      <div className="rightbarFriends pt-7">
        <div className="userFriends">
        <code className='userFriends font-bold'>User Friends</code>
        <div className="listuserFriends grid grid-cols-2">
          { listFriends ? listFriends : null } 
        </div>
      </div>
      </div>
    </div>
  )
}

export default Rightbar
