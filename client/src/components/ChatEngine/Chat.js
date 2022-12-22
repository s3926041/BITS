import React, { useEffect, useState, useContext } from "react";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import "./styles.css";
import { Transition } from "@headlessui/react";
import io from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
const socket = io.connect("http://localhost:8900", {
  withCredentials: true,
});
function Chat() {
  const { userGlobal } = useContext(AuthContext);
  const { authState, setAuthState } = userGlobal;
  const [curMessage, setCurMessage] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [joined, setJoined] = useState(false);
  const [arrMessage, setArMessage] = useState([]);
  const sendMessage = async () => {
    if (curMessage !== "") {
      const messageData = {
        userid:authState.id,
        message: curMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("sendMessage", messageData);
      setArMessage((list) => [...list, messageData]);
    }
  };
  const handleEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const toggle = () => {
    setOpen(!open);
  };
  const joinChat = async () => {
    const res = await axios
      .get("http://localhost:5000/api/chat/create", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .catch((err) => console.log(err.message));
    socket.emit("join_chat", authState.id);
    console.log(email);
    setJoined(true);
  };
  useEffect(()=>{

  })

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setArMessage((list) => [...list, data]);
    });
  }, [socket]);
  const out = () => {
    setJoined(false);
    setEmail("");
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

            {/* {email.length == 0 ? (
              <span className="text-center font-bold text-lg text-[white] mt-4 h-[100px]">
                {" "}
                Enter your email <br /> to get started
              </span>
            ) : (
              <div className="h-[100px] mt-4">
                {" "}
                <input
                  type="submit"
                  value="Continue"
                  className="rounded-lg border-2 h-10 bg-white   w-[205.6px]  font-bold text-lg"
                  onClick={handleContinue}
                ></input>
              </div>
            )} */}
          </div>
          <div className={`${joined ? "block" : "hidden"}`}>
            <div className="header h-[50px] flex justify-center align-items-center">
              {" "}
              <h3 className=" text-lg text-[white]">Live Support</h3>
            </div>
            <div className="bg-white w-full h-[350px] rounded-b-lg flex flex-col justify-between">
              <div className="body h-[300px] overflow-scroll p-2">
                {arrMessage.map((message) => {
                  return <h1>{message.message}</h1>;
                })}
              </div>
              <div className="end h-[50px] flex justify-center align-items-center mx-2 border-t-2">
                <input
                  className="border-2 rounded h-[40px] mr-4 p-2"
                  type="text"
                  name=""
                  id=""
                  placeholder="Ask something"
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
