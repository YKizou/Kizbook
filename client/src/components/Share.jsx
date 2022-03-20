import { EmojiEmotions, LocationOn, LocalOffer, PermMedia, Cancel } from '@mui/icons-material'
import axios from 'axios'
import React, { useContext, useRef } from 'react'
import { useState } from 'react'
import { AuthContext } from '../context/AuthContext'

const Share = () => {
  const PF = "https://kizbook-imgs.s3.eu-west-1.amazonaws.com"
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
      const fileName = "post/" + Date.now() + file.name;
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
      <div className="shareIcons justify-between p-2 px-4">
        <div className="flex">
          <ul className="shareIcons pt-3 flex">
            <label htmlFor="file" className="shareIconList mr-7">
              <PermMedia className="text-red-400"/>
              <code className='ml-1 cursor-pointer'>Photo</code>
              <input className="hidden" type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}/>
            </label>
          </ul>
          <button className="shareButton bg-green-600 rounded text-white p-1 px-2">Share</button>
        </div>
        { file && (
          <div className="shareImgContainer flex w-20 p-2">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <Cancel className='shareCancelImg cursor-pointer' onClick={()=>setFile(null)} />
          </div>
        )}
      </div>
    </form>
  )
}

export default Share
