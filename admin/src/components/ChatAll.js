
import React, { useEffect, useState, useContext } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000", {
  withCredentials: true,
});
function ChatAll() {
    useEffect(()=>{
        axios.get('http://localhost:5000/api/chat/getall').then(res=> console.log(res.data))
    })
  return (
    <div>ChatAll</div>
  )
}

export default ChatAll