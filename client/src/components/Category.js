import React, { useState, useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookDisplay from "./BookDisplay";
import Pagnition from "./Pagnition";
import { AuthContext } from "../helpers/AuthContext";

export default function Category() {
  const { category, page } = useParams();
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const {userGlobal,cartGlobal} = useContext(AuthContext)
  const { cart, setCart } = cartGlobal
  let t = totalPage;
  let apiLink =
    "https://api.itbook.store/1.0/search/" + `${category}` + "/" + `${page}`;
  let check = false;
  useEffect(() => {
    async function fetchData() {
      const req = await axios.get(apiLink);
      if (!check) {
        setTotalPage(Math.ceil(parseFloat(req.data.total) / 10));
        check = false;
      }
      setData(req.data.books);
      console.log(apiLink + `${category}` + "/" + `${page}`);
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
      <Pagnition
        para1={"category"}
        para2={category}
        t={t}
        page={page}
      ></Pagnition>
    </div>
  );
}
