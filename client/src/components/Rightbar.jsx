import React from 'react'
import { Users } from '../dummyData'
const PF = process.env.REACT_APP_PUBLIC_FOLDER
const PB_ADS = PF + "ad.png"
const PB_GIFT = PF + "gift.png"

const Rightbar = () => {
  let connectedUsers = []
  for(let i =0; i<2; i++){
    connectedUsers.push(          
    <div key={i} className="flex pt-3">
      <img src={PF+Users[i].profilePicture} alt="" className="topbarImg cursor-pointer h-12 w-12 rounded-full object-cover"/>
      <span className="topbarIconBadge rounded-full w-6 h-6 ml-7 absolute -z-100 bg-green-500 border-4 border-white justify-center"></span>
      <code className="font-bold pl-3 text-sm self-center">{Users[i].username}</code>
    </div> )
  }
  return (
    <div className='rightbar pt-5 w-1/4 overflow-y-scroll px-2'>
      <div className='rightbarBirthday flex pb-7'>
        <img src={PB_GIFT} alt="" className="rightbarBirthdayImg cursor-pointer h-12 w-12"/>
        <code className="ml-4"><b>Youssef Kizou</b> and <b>3 other friends</b> have a birthday today.</code>
      </div>
      <img src={PB_ADS} alt="" className="rightbarAd rounded-2xl" />
      <div className="rightbarFriends pt-7">
        <div className="rightbarListFriends">
          <code className="font-bold text-lg">Online Friends</code>
          {connectedUsers}
        </div>
      </div>
    </div>
  )
}

export default Rightbar
