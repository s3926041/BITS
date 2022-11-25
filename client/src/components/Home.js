import React, { useEffect, useState } from "react";


import axios from "axios";

import BookDisplay from "./BookDisplay";

function Home({cart,setCart}) {
  let apiLink = "https://api.itbook.store/1.0/new";
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get(apiLink);

      setData(req.data.books);

      return req;
    }
    fetchData();
  }, []);
  return (
    <BookDisplay data={data} cart={cart} setCart={setCart}></BookDisplay>
  );
}

export default Home;
