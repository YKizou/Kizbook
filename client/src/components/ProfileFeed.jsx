import React, { useContext } from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Post from "./Post";
import Share from "./Share";
import axios from "axios";
import { AuthContext } from '../context/AuthContext'

const ProfileFeed = () => {
  const [posts, setPosts] = useState([]);
  const { username } = useParams();
  const user = useContext(AuthContext)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/api/posts/profile/" + username);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-3/5 flex flex-col overflow-y-scroll">
      { username===user.user._id ? <Share /> : null }
      {posts.map((p) => (
        <Post key={p._id} post={p} />
      ))}
    </div>
  );
};

export default ProfileFeed;
