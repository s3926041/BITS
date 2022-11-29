import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function General() {
  const [data, setData] = useState([]);
  const { userId } = useParams();
  const apiCall = async () => {
    await axios
      .get(`http://localhost:5000/api/order/general`, {
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
  console.log(data);
  return (
    <div>
      {data.map((item) => {
        return (
          <> 
            <a href={`/user/order/details/${item._id}`}>{item._id}</a>
            <br />
          </>
        );
      })}
    </div>
  );
}
