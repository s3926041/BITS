
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { getPosts } from './actions/posts';
import Navi from './components/Navi';
import Home  from './components/Home'
import Auth from './components/Auth';
import axios from 'axios';
const App = () => {
  const [data, setData] = useState([]);
  const [search,setSearch] = useState('a')
  const [currentId, setCurrentId] = useState(0);
  useEffect(() => {
    async function fetchData(){
      const req = await axios.get("https://www.googleapis.com/books/v1/volumes?q=" +search+"&key=AIzaSyAU4a-8SdxzNENbeAKwDiCMsxF6eqa58B0&maxResults=40")
      setData(req.data.items)
      console.log(req.data.items)
      return req
    }
    fetchData()
  }, [search]);
  const changeSearch = (value) =>{
    setSearch(value)
  }
  return (
    <BrowserRouter>
     <Navi setSearch={changeSearch}/>
     <Routes>
     <Route path="/home" element={<Home data={data} />}></Route>
     <Route path='/auth' element={<Auth/>}></Route>
     </Routes>
    </BrowserRouter>
       
  );
};

export default App;