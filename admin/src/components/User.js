
import { useState, useEffect } from "react";
import axios from 'axios'
function User() {
    const [data,setData] = useState([])
    useEffect(() => {
      axios
        .get("http://localhost:5000/api/user/getall/", {
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

export default User