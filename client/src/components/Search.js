import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import BookDisplay from "./BookDisplay";
import Pagnition from "./Pagnition";

export default function Search({cart,setCart}) {
  const { search, page } = useParams();
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  let t = totalPage;
  let apiLink =
    "https://api.itbook.store/1.0/search/" + `${search}` + "/" + `${page}`;
  let check = false;
  useEffect(() => {
    async function fetchData() {
      const req = await axios.get(apiLink);
      if (!check) {
        setTotalPage(Math.ceil(parseFloat(req.data.total) / 10));
        check = false;
      }
      setData(req.data.books);
      console.log(apiLink);
      return req;
    }
    fetchData();
  }, []);
  t = totalPage;
  t > 5 ? (t = 5) : (t = t);
  console.log(apiLink);
  return (
    <div className="">
     <BookDisplay data={data} cart={cart} setCart={setCart}></BookDisplay>
    <Pagnition para1={"search"} para2={search} t={t} page={page}></Pagnition>
    </div>
  );
}
