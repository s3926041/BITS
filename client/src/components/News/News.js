import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'


function News() {
    const [data, setData] = useState({});
    let url = 'https://newsdata.io/api/1/news?apikey=pub_14752de18074c4b6021624701d1549d10b4dc&page=2&country=us/ '
    useEffect(() => {
      async function fetchData() {

        const req = await axios.get(url);
        setData(req.data);
        console.log(req.data)
        // console.log(req.data.articles[0].content);
        return req;
       
      }
      // async function fetchData2() {
      //   const req1 = await axios.get('http://localhost:5000/api/news')
      //   console.log(req1.data)
      // }
      fetchData();
    }, []);
  return (
    <div>{JSON.stringify(data)}</div>
  )
}

export default News