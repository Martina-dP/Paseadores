import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ChatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const token = localStorage.getItem("userToken");
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const id = localStorage.getItem("userId");

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/getFavorite/" + currentId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFriends(res.data);
    };
    getFriends();
  }, [currentId, token]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f)));
  }, [friends, onlineUsers]);

  console.log("favoritos", friends);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(`conversations/find/${currentId}/${id}`);
      setCurrentChat(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={o.image ? o.image : ""}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineUserName">{o}</span>
        </div>
      ))}
    </div>
  );
}
