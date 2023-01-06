import React, { useEffect, useState, useContext, useRef } from "react";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import "./styles.css";
import { Transition } from "@headlessui/react";
import io from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
import { format } from "timeago.js";

function Chat() {
  const { userGlobal } = useContext(AuthContext);
  const { authState, setAuthState } = userGlobal;
  const [curMessage, setCurMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [currentChat, setCurrentChat] = useState(null);
  const [open, setOpen] = useState(false);
  const [joined, setJoined] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
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
      currentChat?.members != "638f10bc77e108e5da95aaf2" &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {}, [authState]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/conversations/" + authState.id
        );
        setCurrentChat(res.data);

      } catch (err) {
      }
    };
    getConversations();
  }, [authState.id]);

  const sendMessage = async () => {
    if (curMessage !== "") {
      const message = {
        sender: authState.id,
        text: curMessage,
        conversationId: currentChat._id,
      };
      socket.current.emit("sendMessage", {
        senderId: authState.id,
        receiverId: "",
        text: curMessage,
      });

      try {
        const res = await axios.post(
          "http://localhost:5000/api/messages",
          message
        );
        setMessages([...messages, res.data]);
        setCurMessage("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const toggle = () => {
    setOpen(!open);
  };
  const joinChat = async () => {
    await axios
      .get("http://localhost:5000/api/conversations/", {
        headers: {
          token: localStorage.getItem("token"),
        },
      }).catch(err=>{})
    await axios
      .get("http://localhost:5000/api/messages/" + currentChat?._id)
      .then((res) => setMessages(res.data));
    socket.current.emit("addUser", authState.id);
    setJoined(true);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
console.log(joined)
  const out = () => {
    setJoined(false);
  };
  return (
    <>
      <div
        onClick={toggle}
        className="cursor-pointer fixed w-[50px] h-[50px] md:w-[80px] md:h-[80px] rounded-[50%] bg-indigo-600  z-[999] bottom-[20px] right-[50px] flex justify-center align-items-center shadow border-gray"
      >
        <ChatRoundedIcon style={{ color: "white" }}></ChatRoundedIcon>
      </div>

      <Transition
        show={open}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={`fixed w-[300px] h-[400px] bg-indigo-600 shadow right-[50px] bottom-[80px] md:bottom-[110px] z-[999] rounded-xl ${
            open ? "block" : "hidden"
          }`}
        >
          <div className="absolute top-3 right-3 cursor-pointer">
            <CloseRoundedIcon
              style={{ color: "white" }}
              onClick={toggle}
            ></CloseRoundedIcon>
          </div>
          <div
            className={`absolute top-3 left-3 cursor-pointer ${
              joined ? "block" : "hidden"
            }`}
          >
            <LogoutIcon style={{ color: "white" }} onClick={out}></LogoutIcon>
          </div>
          <div
            className={`flex flex-col justify-center align-items-center h-full w-full ${
              joined ? "hidden" : "block"
            }`}
          >
            <span className="text-center font-bold text-lg text-[white] my-4">
              Welcome to our
              <br /> support <span class="wave">👋</span>{" "}
            </span>
            {authState.status && (
              <input
                type="button"
                onClick={joinChat}
                className="rounded-lg border-2 h-10 bg-white   w-[205.6px]  font-bold text-lg"
                value="Join"
              />
            )}
            {!authState.status && (
              <a
                href="/signin"
                className="rounded-lg border-2 h-10 bg-white  w-[205.6px] flex align-items-center justify-center  font-bold text-lg"
              >
                Login
              </a>
            )}
          </div>
          <div className={`${joined ? "block" : "hidden"}`}>
            <div className="header h-[50px] flex justify-center align-items-center">
              {" "}
              <h3 className=" text-lg text-[white]">Live Support</h3>
            </div>
            <div
              className={`bg-white w-full h-[350px] rounded-b-lg flex flex-col`}
            >
              <div className="body h-[300px] overflow-x-hidden p-2">
                {messages.map((message) => {
                  return (
                    <div
                      ref={scrollRef}
                      className={`w-full  my-2 flex flex-col ${
                        message.sender == authState.id
                          ? "align-items-end"
                          : "align-items-start"
                      } `}
                    >
                      {" "}
                      <div
                        className={`wrap rounded p-2 min-w-[100px] max-w-[200px] ${
                          message.sender == authState.id
                            ? "bg-indigo-600"
                            : "bg-gray-200"
                        } `}
                      >
                        <span
                          className={`flex ${
                            message.sender == authState.id
                              ? "text-white justify-end"
                              : "text-black"
                          }`}
                        >
                          {message.text}
                        </span>
                      </div>
                      <div
                        className={`flex w-full ${
                          message.sender == authState.id
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <span className="text-[13px]">
                          {/* {`${new Date(
                            message.createdAt
                          ).getHours()}:${new Date(
                            message.createdAt
                          ).getMinutes()}`}{" "} */}
                    {      format(message.createdAt)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="end h-[50px] flex justify-center align-items-center mx-2 border-t-2">
                <input
                  className="border-2 rounded h-[40px] mr-4 p-2"
                  type="text"
                  name=""
                  id=""
                  placeholder="Ask something"
                  value={curMessage}
                  onChange={(event) => {
                    setCurMessage(event.target.value);
                    // console.log(curMessage)
                  }}
                />
                <SendIcon
                  className="cursor-pointer hover:text-black text-blue-600"
                  onClick={sendMessage}
                ></SendIcon>
              </div>
            </div>
          </div>
        </div>
        <div className=""></div>
      </Transition>
    </>
  );
}
export default Chat;
