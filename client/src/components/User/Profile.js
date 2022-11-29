import React,{useEffect,useState} from 'react'
import axios from 'axios';

function Profile() {
  const [data,setData] = useState([])
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth", {
        headers: {
          token: localStorage.getItem("token"),
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

export default Profile