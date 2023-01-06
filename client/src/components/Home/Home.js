// import Template from "../Book/Template";

import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  let apiLink = "http://localhost:5000/api/product/";
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(apiLink).then((res) => setData(res.data));
    };
    fetchData();
  }, []);
  console.log(data);
  return (
    <>
     <div className="h-[120vh] md:h-[80vh] bg-[#F7F7F7] grid place-items-center text-[50px]">Banner</div>
      <div className="h-[120vh] md:h-[80vh] mx-auto max-w-2xl py-6  px-4 sm:px-6 lg:max-w-7xl lg:px-8 flex justify-between items-center">
        <div className="trending w-full">
          <div className="top flex justify-between align-items-center">
            <h2 className="font-bold text-[25px]">Trending books</h2>
            <a href="/books" className="text-indigo-600 font-bold">
              See everything
            </a>
          </div>
          <div className="grid md:grid-cols-2  xl:grid-cols-4">
            {data.slice(10, 14).map((item) => {
              return (
                <div className="p-10 rounded flex flex-col align-items-center">
                  <a href={`/book/${item._id}`} className="rounded-xl w-[275px] h-[275px] bg-[#F7F7F7] flex flex-col justify-center align-items-center">
                    <img
                      className="rounded-xl w-[200px] h-[200px] "
                      src={item.img}
                    />
                  </a>
                  <div className="m-2">
                    <div className="author mx-2 text-sm">{item.author}</div>
                    <div className="title m-2 font-bold limit_txt">
                      {item.title}
                    </div>
                    <div className="price m-2">${item.price}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

     
      </div>

      <div className="h-[120vh] md:h-[80vh] bg-[#F7F7F7] grid place-items-center text-[50px]">Banner</div>
      <div className="h-[120vh] md:h-[80vh] mx-auto max-w-2xl py-6  px-4 sm:px-6 lg:max-w-7xl lg:px-8 flex justify-between items-center">
        <div className="trending w-full">
          <div className="top flex justify-between align-items-center">
            <h2 className="font-bold text-[25px]">New Arrivals</h2>
            <a href="/books" className="text-indigo-600 font-bold">
              See everything
            </a>
          </div>
          <div className="grid md:grid-cols-2  xl:grid-cols-4">
            {data.slice(20, 24).map((item) => {
              return (
                <div className="p-10 rounded flex flex-col align-items-center">
                  <a href={`/book/${item._id}`}  className="rounded-xl w-[275px] h-[275px] bg-[#F7F7F7] flex flex-col justify-center align-items-center">
                    <img
                      className="rounded-xl w-[200px] h-[200px] "
                      src={item.img}
                    />
                  </a>
                  <div className="m-2">
                    <div className="author mx-2 text-sm">{item.author}</div>
                    <div className="title m-2 font-bold limit_txt">
                      {item.title}
                    </div>
                    <div className="price m-2">${item.price}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
