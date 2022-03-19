import axios from "axios";
import React, { useEffect, useState } from "react";

const Rightbar = ({ user }) => {
  const PF = "/images/";
  const [listFriends, setListFriends] = useState([]);
  const PB_ADS = PF + "ad.png";

  useEffect(() => {
    const fetchFollowings = async () => {
      await user.user.followings.map(async (u) => {
        const res = await axios.get("/api/users/" + u);
        var profileUrl = "/profile/" + res.data._id;
        setListFriends((oldArray) => [
          ...oldArray,
          <div key={res.data._id} className="flex flex-col pt-3">
            <a href={profileUrl}>
              <img
                src={PF + res.data.profilePicture}
                alt=""
                className="topbarImg cursor-pointer h-28 w-28 rounded object-cover"
              />
            </a>
            <code className="font-bold text-sm">{res.data.username}</code>
          </div>,
        ]);
      });
    };
    fetchFollowings();
  }, [user]);

  return (
    <div className="rightbar pt-5 w-1/4 overflow-y-scroll px-2">
      <img src={PB_ADS} alt="" className="rightbarAd rounded-2xl" />
      <div className="rightbarFriends pt-7">
        <div className="userFriends">
          <code className="userFriends font-bold">User Friends</code>
          <div className="listuserFriends grid grid-cols-2">
            {listFriends ? listFriends : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
