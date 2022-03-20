import axios from "axios";
import React, { useEffect, useState } from "react";

const RightbarProfile = ({ user }) => {
  const PF = "https://kizbook-imgs.s3.eu-west-1.amazonaws.com";
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    if (user._id) {
      (async () => {
        const res = await axios.get("/api/users/all/" + user._id);
        res.data.map((e) => {
          var profileUrl = "/profile/" + e._id;
          setListUsers((oldArray) => [
            ...oldArray,
            <div key={e._id} className="flex flex-col pt-3">
              <a href={profileUrl}>
                <img
                  src={PF + e.profilePicture}
                  alt=""
                  className="topbarImg cursor-pointer h-28 w-28 rounded object-cover"
                />
              </a>
              <code className="font-bold text-sm">{e.username}</code>
            </div>,
          ]);
        });
      })();
    }
  }, [user]);

  return (
    <div className="rightbarProfile pt-5 w-1/4 overflow-y-scroll pl-2">
      <div className="userinfos flex flex-col pb-6">
        <code className="userInformation font-bold mb-2">User Information</code>
        <code className="userCity">City: {user.city}</code>
        <code className="userFrom">From: {user.from}</code>
      </div>

      <div className="userFriends">
        <code className="userFriends font-bold">Other users :</code>
        <div className="listuserFriends grid grid-cols-2">
          {listUsers ? listUsers : null}
        </div>
      </div>
    </div>
  );
};

export default RightbarProfile;
