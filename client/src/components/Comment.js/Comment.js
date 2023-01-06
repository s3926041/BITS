import React, { useEffect, useState, useContext } from "react";
import { format } from "timeago.js";
import LetteredAvatar from "react-lettered-avatar";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
export default function Comment({ id, name }) {
  const { userGlobal } = useContext(AuthContext);
  const { authState, setAuthState } = userGlobal;
  const [content, setContent] = useState("");
  const [data, setData] = useState([]);
  const [newC, setNew] = useState(0);
  const change = (e) => {
    setContent(e.target.value);
  };
  const send = async () => {
    await axios
      .post(
        "http://localhost:5000/api/comment/create",
        {
          id: id,
          content: content,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setNew((prev) => prev + 1);
        setContent("");
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      await axios.get("http://localhost:5000/api/comment/" + id).then((res) => {
        setData(res.data);
        console.log(res.data);
      });
    };
    fetchData();
  }, [newC]);
  return (
    <div className="mx-4 w-full flex flex-col justify-center align-items-center">
      <span className="font-bold mb-4">Comment Section</span>
      <div className=" up flex">
        <LetteredAvatar name={authState.username} size={40} />
        <div className="w-full ml-4 md:w-[800px] flex align-items-center">
          {" "}
          <input
            value={content}
            onChange={change}
            type="text"
            className="break-words  w-full h-[40px] border-b-2 focus:border-black "
          />
          <input type="submit" value={"Send"} onClick={send} />
        </div>
      </div>
      <div className="my-10 ">
        {data.map((item) => {
          return (
            <div className="comment w-full flex  my-4">
              <LetteredAvatar name={item.username} size={40} />
              <div className="w-full ml-4 md:w-[800px]">
                <span className="text-sm">@{item.username} - </span>
                <span className="text-sm">{format(item.createdAt)}</span>
                <br />
                <p className="text-xl w-full ">{item.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
