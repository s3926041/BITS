import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comment from "../Comment.js/Comment";
import axios from "axios";
export default function BlogDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios.get("http://localhost:5000/api/blog/" + id).then((res) => {
        setData(res.data);
        console.log(res.data);
      });
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="flex flex-col align-items-center justify-center w-full">
        <div className="my-4 max-w-[600px] ">
          <div className="up mb-8">
            {" "}
            <div className="text-[40px] font-bold">{data[0]?.title}</div>
            <span>By @{data[0]?.author}</span> <br />
            <span>{JSON.stringify(new Date(data[0]?.createdAt).getDate())}/{JSON.stringify(new Date(data[0]?.createdAt).getMonth())}/{JSON.stringify(new Date(data[0]?.createdAt).getFullYear())}</span>
          </div>
          <div className="body">
            <p className="break-words">{data[0]?.content}</p>
          </div>
        </div>
        <Comment id={id}></Comment>
      </div>
    </>
  );
}
