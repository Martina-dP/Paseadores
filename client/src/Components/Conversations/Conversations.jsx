import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Conversations.css";

export default function Conversations({ conversations, currentUser }) {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const friendId = conversations.members.find((m) => m !== currentUser);

    const getUser = async () => {
      try {
        const res = await axios.get(`/walkers/${friendId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, [currentUser, conversations, token]);

  console.log("USEER", user);
  return (
    <div className="conversation">
      <img className="conversationImg" src={user?.image || ""} alt="" />
      <span className="conversationName">{user?.name || ""}</span>
    </div>
  );
}
