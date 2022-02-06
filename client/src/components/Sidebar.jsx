import React from 'react'
import {RssFeed, HelpOutline, Bookmark, SlowMotionVideo, Chat, Group} from "@mui/icons-material"
import { Users } from '../dummyData'

const PF = process.env.REACT_APP_PUBLIC_FOLDER

const Sidebar = () => {
  let users = []
  for(let i =0; i<7; i++){
    users.push(          
      <div key={i} className="flex pt-3">
        <img src={PF+ Users[i].profilePicture} alt="" className="topbarImg cursor-pointer h-12 w-12 rounded-full object-cover"/>
        <code className="font-bold text-sm pl-3 self-center">{Users[i].username}</code>
      </div>
    )
  }
  return (
    <div className='w-1/4 pt-5 divide-y overflow-y-scroll flex flex-col'>
      <ul className="sidebarList">
        <li className="sidebarListItem pb-5">
            <RssFeed className=''/>
            <code className='ml-4'>Feed</code>
        </li>
        <li className="sidebarListItem pb-5">
            <Chat/>
            <code className='ml-4'>Chats</code>
        </li>
        <li className="sidebarListItem pb-5">
            <SlowMotionVideo/>
            <code className='ml-4'>Videos</code>
        </li>
        <li className="sidebarListItem pb-5">
            <Group/>
            <code className='ml-4'>Groups</code>
        </li>
        <li className="sidebarListItem pb-5">
            <Bookmark/>
            <code className='ml-4'>Bookmarks</code>
        </li>
        <li className="sidebarListItem pb-5">
            <HelpOutline/>
            <code className='ml-4'>Questions</code>
        </li>
      </ul>
      <div className="rightbarFriends pt-7">
        <div className="rightbarListFriends px-2">
          {users}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
