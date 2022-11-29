import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate()
  const post = async () => {
    // console.log(localStorage.getItem("group100_cart"))
    await axios
      .post(
        "http://localhost:5000/api/order/place",
        JSON.parse(localStorage.getItem("group100_cart")),
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        localStorage.removeItem("group100_cart");
        navigate('/success/:orderId')
      })
      .catch((err) => {
        alert(err.message)
      });
  };
  const handleClick = () => {
    if(localStorage.getItem('group100_cart') !== null)
      post();
  };
  return (
    <div>
      {JSON.stringify(localStorage.getItem("group100_cart"))}
      <button onClick={handleClick}>Place</button>
    </div>
  );
}
