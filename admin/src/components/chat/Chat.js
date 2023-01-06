import "./messenger.css";
import Conversation from "./Conversation";
import Message from "./Message";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { AuthContext } from "../../helpers/AuthContext";

export default function Chat() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();
  const { authState } = useContext(AuthContext);

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
      currentChat?.members &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", authState.id);
    // socket.current.on("getUsers", (users) => {
    //   setOnlineUsers(
    //     user.followings.filter((f) => users.some((u) => u.userId === f))
    //   );
    // });
  }, [authState]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/conversations/",
          {},
          { headers: { token: sessionStorage.getItem("token") } }
        );
        console.log(res.data);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [authState.id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: authState.id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members;

    socket.current.emit("sendMessage", {
      senderId: authState.id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        "http://localhost:5000/api/messages",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation
                  conversation={c}
                  currentUser={authState}
                  currentChat={currentChat}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox border overflow-x-hidden">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop overflow-x-hidden">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === authState.id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom overflow-x-hidden">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex justify-center align-items-center">
                <span className="noConversationText ">Choose conversation</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
