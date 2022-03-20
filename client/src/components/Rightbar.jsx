import axios from "axios";
import React, { useEffect, useState } from "react";

const Rightbar = ({ user }) => {
  const PF = "/images/";
  const [listUsers, setListUsers] = useState([]);
  const PB_ADS = PF + "ad.png";

  useEffect(() => {
    if (user.user._id) {
      (async () => {
        const res = await axios.get("/api/users/all/" + user.user._id);
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
    <div className="rightbar pt-5 w-1/4 overflow-y-scroll px-2">
      <img src={PB_ADS} alt="" className="rightbarAd rounded-2xl" />
      <div className="rightbarFriends pt-7">
        <div className="userFriends">
          <code className="userFriends font-bold">Other users :</code>
          <div className="listuserFriends grid grid-cols-2">
            {listUsers ? listUsers : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
