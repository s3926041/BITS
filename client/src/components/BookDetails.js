import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function BookDetails({cart,setCart}) {
    const [data,setData] = useState({})
    let {id} = useParams()
    let apiLink = `https://api.itbook.store/1.0/books/${id}`;
    useEffect(() => {
        async function fetchData() {
            const req = await axios.get(apiLink);
          setData(req.data);
          console.log(req.data)
          return req;
        }
        fetchData();
      }, []);
  return (
    // {"error":"0","title":"Deno Succinctly","subtitle":"","authors":"Mark Lewin","publisher":"Syncfusion","language":"English","isbn10":"1642002143","isbn13":"9781642002140","pages":"110","year":"2021","rating":"4","desc":"Deno is a JavaScript runtime by the creator of Node, built upon the lessons learned from Node becoming an integral part of so many apps since 2009, plus the ever-changing web app landscape. In Deno Succinctly, author Mark Lewin illuminates the improvements that Deno brings to server-side web develop...","price":"$0.00","image":"https://itbook.store/img/books/9781642002140.png","url":"https://itbook.store/books/9781642002140","pdf":{"Free eBook":"https://www.dbooks.org/d/1642002143-1659962308-1d9c81a8d7da2a97/"}}
    <div>BookDetails</div>
  )
}
