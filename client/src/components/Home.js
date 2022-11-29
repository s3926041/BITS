import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";

import axios from "axios";

import BookDisplay from "./Book/BookDisplay";

function Home() {
  let apiLink = "http://localhost:5000/api/product/";
  const [data, setData] = useState([]);
  const { userGlobal, cartGlobal } = useContext(AuthContext);
  const { cart, setCart } = cartGlobal;
  const compare = (a, b) => {
    if (a.price > b.price) return 1;
    if (a.price < b.price) return -1;
    return 0;
  };
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(apiLink);
      setData(res.data);
      return res;
    }
    fetchData();
  }, []);
  return <BookDisplay data={data} cart={cart} setCart={setCart}></BookDisplay>;
}

export default Home;
