import React, { useEffect, useRef, useState } from "react";
import "./Messenger.css";
import Nav from "../PerfilWalker/nav/Nav";
import Conversations from "../Conversations/Conversations";
import Message from "../Message/Message";
import ChatOnline from "../ChatOnline/ChatOnline";
import { useSelector } from "react-redux";
import axios from "axios";
import { io } from "socket.io-client";
import dotenv from "dotenv";
dotenv.config();
const baseURL = process.env.REACT_APP_API || "http://localhost:3001";

const CONNECTION_PORT = baseURL;

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // const [socket, setSocket] = useState(null);
  const socket = useRef(io(`ws://${baseURL}`));
  const users = useSelector((state) => state.allPaseadores);
  const id = localStorage.getItem("userId");
  const scrollRef = useRef();

  // useEffect(() => {
  //   setSocket(io(`ws://localhost:3001`));
  // }, []);

  useEffect(() => {
    socket.current = io(`ws://${baseURL}`);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("thisUsuario", id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [id]);

  // useEffect(() => {
  //   socket?.on("bienvenido", (message) => {
  //     console.log(message);
  //   });
  // }, [socket]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + id);
        setConversations(res.data);
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getConversations();
  }, [id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?.id);
        setMessages(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: id,
      text: newMessage,
      conversationId: currentChat.id,
    };

    const receiverId = currentChat.members.find((m) => m !== id);

    console.log("chat", currentChat);

    socket.current.emit("sendMessage", {
      senderId: id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   socket.current.on("getMessage", data => {

  //   })
  // }, [])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <Nav />
      <div className="messenger">
        <div className="chatmenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              name=""
              id=""
              placeholder="Buscar Amigos"
              className="chatMenuInput"
            />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversations conversations={c} currentUser={id} />
              </div>
            ))}
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Escriba aqui"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Enviar
                  </button>
                </div>{" "}
              </>
            ) : (
              <span className="noConversationText">
                Inicia una conversación
              </span>
            )}
          </div>
        </div>

        {/* <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}
