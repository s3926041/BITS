
import { useState, useEffect } from "react";
import axios from 'axios'
function Product() {
    const [data,setData] = useState([])
    useEffect(() => {
      axios
        .get("http://localhost:5000/api/product/", {
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

export default Product