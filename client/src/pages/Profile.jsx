import React, { useEffect, useState } from "react";
import ProfileFeed from "../components/ProfileFeed";
import Feed from "../components/Feed";

import RightbarProfile from "../components/RightbarProfile";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const PF = "/images/";
  const { username } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/api/users/" + username);
      setUser(res.data);
    };
    fetchUser();
  }, []);

  return (
    <div className="profile flex justify-between px-5">
      <Sidebar />
      <div className="profileRight">
        <div className="profileRightTop flex flex-col h-[26rem]">
          <img
            src="/assets/post/3.jpeg"
            alt=""
            className="profileCoverImage h-64 w-max object-cover absolute cursor-pointer"
          />
          <div className="profileInfos flex flex-col">
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "/person/noAvatar.png"
              }
              alt=""
              className="profilePicture topbarImg m-auto cursor-pointer w-32 h-32 mt-48 rounded-full object-cover z-20 border-2 border-white flex-end"
            />
            <code className="nameProfile text-2xl m-auto font-bold">
              {user.username}
            </code>
            <code className="nameDescription text-sm m-auto">{user.desc}</code>
          </div>
        </div>
        <div className="profileRightBottom flex">
          <ProfileFeed />
          {/* <Feed /> */}
          <RightbarProfile user={user} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
