import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Details() {
  const [data, setData] = useState([]);
  const { orderId } = useParams();
  const apiCall = async () => {
    await axios
      .get(`http://localhost:5000/api/order/details/${orderId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    apiCall();
  }, []);
  return (
    <div>
      {
        JSON.stringify(data)
      }
    </div>
  );
}
