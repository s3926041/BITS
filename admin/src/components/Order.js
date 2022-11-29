
import { useState, useEffect } from "react";
import axios from 'axios'
export default function Order() {
    const [data,setData] = useState([])
    useEffect(() => {
      axios
        .get("http://localhost:5000/api/order/all", {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          setData(response.data)
        });
    }, []);
    return (
      <div>{JSON.stringify(data)}</div>
    )
}
