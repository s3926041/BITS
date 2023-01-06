import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser,currentChat }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members
    const getUser = async () => {
      try {
        const res = await axios("http://localhost:5000/api/user/find/" + friendId,{
          headers: {
            token: sessionStorage.getItem("token"),
          },
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className={`conversation border my-3 ${conversation===currentChat ? 'bg-black': 'bg-[rgb(245, 243, 243)'}`}>
      <img width={'50px'} className='rounded' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png" alt="" />
      <span className={`conversationName mx-2 font-bold ${conversation===currentChat ? 'text-white':''}`}>{user?.username}</span>
    </div>
  );
}
