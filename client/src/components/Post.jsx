import { MoreVert, ThumbUp } from '@mui/icons-material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function Post({post}) {
  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const [users, setUsers] = useState({})
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const PageProfile = "http://localhost:3000/profile/" + post.userId
  const {user} = useContext(AuthContext)

  // const {username} = useParams()

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id))
  }, [])

  useEffect(()=>{
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:8800/api/users/"+post.userId)
      setUsers(res.data)
    };
    fetchUser()
    }, [])

  const handleLike = async () => {
    try {
      await axios.put("http://localhost:8800/api/posts/"+post._id+"/like", {userId: user._id})
    }catch(err){}
    isLiked ? setLike(like-1) : setLike(like+1);
    setIsLiked(!isLiked);
  }
  console.log()
  return (
    <div className='Post overflow-x-scroll shadow-xl  pt-5 p-2 mx-4 space-y-3'>
      <div className="postHeader flex">
        <div className="postHeaderRight flex items-center w-full space-x-3">
          <a href={PageProfile} className='flex items-center space-x-3'>
          {users._id===post.userId ? <img key={users._id} src={PF+users.profilePicture} alt="" className="postHeaderImg cursor-pointer h-10 w-10 rounded-full object-cover"/> : null }
          <code className='font-bold'>
            {users._id===post.userId ?
              <code key={users.id}>{users.username}</code> : null
            }</code>
          </a>
          <code className='text-xs'>{post.createdAt}</code>
        </div>
        <MoreVert className="scale-125"/>
      </div>
      <div className="postContent flex flex-col space-y-5">
        <code className=''>{post.desc}</code>
        <img src={PF+post.img} alt="" className=""/>
      </div>
      <div className="postFooter flex justify-between">
        <div className="postFooterLikes space-x-3 ml-2">
          {isLiked ? 
          <ThumbUp className="bg-red-400 rounded-full p-1 text-white cursor-pointer" onClick={handleLike}/> :
          <ThumbUp className="bg-blue-400 rounded-full p-1 text-white cursor-pointer" onClick={handleLike}/>
          }
          
          <code className='text-sm cursor-pointer'>{like} people like it.</code>
        </div>
        { post.comment === 1 || post.comment === 0 ? 
          <code className='text-gray-600 text-sm cursor-pointer'>
            {post.comment} comment</code> : 
          <code className='text-gray-600 text-sm cursor-pointer'>
            {post.comment} comments
          </code>}

      </div>
    </div>
  )
}

export default Post
