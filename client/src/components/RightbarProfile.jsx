import axios from "axios";
import React, { useEffect, useState } from "react";

const RightbarProfile = ({ user }) => {
  const PF = "/images/";

  const [listFriends, setListFriends] = useState([]);

  useEffect(() => {
    const fetchFollowings = async () => {
      await user.followings.map(async (u) => {
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
    <div className="rightbarProfile pt-5 w-1/4 overflow-y-scroll pl-2">
      <div className="userinfos flex flex-col pb-6">
        <code className="userInformation font-bold mb-2">User Information</code>
        <code className="userCity">City: {user.city}</code>
        <code className="userFrom">From: {user.from}</code>
      </div>

      <div className="userFriends">
        <code className="userFriends font-bold">User Friends</code>
        <div className="listuserFriends grid grid-cols-2">
          {listFriends ? listFriends : null}
        </div>
      </div>
    </div>
  );
};

export default RightbarProfile;
