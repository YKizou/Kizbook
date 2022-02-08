import { EmojiEmotions, LocationOn, LocalOffer, PermMedia } from '@mui/icons-material'
import axios from 'axios'
import React, { useContext, useRef } from 'react'
import { useState } from 'react'
import { AuthContext } from '../context/AuthContext'

const Share = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const {user} = useContext(AuthContext)
  const descRef = useRef()
  const [file, setFile] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: descRef.current.value,
    }
    if(file){
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName )
      data.append("file", file)
      newPost.img = fileName;
      try{
        await axios.post("/api/upload", data)
      }catch(err){
        console.log(err)
      }
    }

    try{
      await axios.post("/api/posts", newPost)
      window.location.reload() 
    }catch(err){

    }

  }

  return (
    <form className='share shadow-xl overflow-x-scroll rounded p-2  my-4 items-center divide-y-2 mx-4' onSubmit={handleSubmit}>
      <div className="shareMessage flex pb-3">
        <img src={PF+user.profilePicture} alt="" className="topbarImg cursor-pointer w-14 h-14 rounded-full object-cover"/>
        <input ref={descRef} className='text-gray-400 ml-4 w-full focus:outline-none' placeholder="What's in your mind Youssef ?"></input>
      </div>
      <div className="shareIcons flex justify-between p-2 px-4">
        <ul className="shareIcons pt-3 flex">
          <label htmlFor="file" className="shareIconList mr-7">
            <PermMedia className="text-red-400"/>
            <code className='ml-1 cursor-pointer'>Share a photo</code>
            <input className="hidden" type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}/>
          </label>
          {/* <li className="shareIcon mr-7">
            <LocalOffer className="text-blue-400"/>
            <code className='ml-1 '>Tag</code>
          </li>
          <li className="shareIcon mr-7">
            <LocationOn className="text-green-400"/>
            <code className='ml-1'>Location</code>
          </li>
          <li className="shareIcon mr-7">
            <EmojiEmotions className="text-yellow-400"/>
            <code className='ml-1'>Feelings</code>
          </li> */}
        </ul>
        <button className="shareButton bg-green-600 rounded text-white p-1 px-2">Share</button>
      </div>
    </form>
  )
}

export default Share
