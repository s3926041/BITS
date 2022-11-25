import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { getPosts } from "./actions/posts";
import Navi from "./components/Navi";
import Home from "./components/Home";
import BookDetails from "./components/BookDetails";
import Auth from "./components/Auth";
import axios from "axios";
import Category from "./components/Category";
import Search from "./components/Search";
import Cart from "./components/Cart";
const App = () => {
  const [cart, setCart] = useState(0);
  useEffect(() => {
    let quantity = 0
    if(  localStorage.getItem("group100_cart") !== null) {
      let arr = JSON.parse(localStorage.getItem("group100_cart"));
      for (let key in arr) {
        if (arr.hasOwnProperty(key)) {
            quantity += parseInt(arr[key]['quantity'])
        }
    }
    }
    console.log(quantity);
    setCart(quantity);
  }, []);

  const changeCart = (value) => {
    setCart(value);
    console.log(value)
  };
  return (
    <BrowserRouter>
      <Navi cart={cart} setCart={changeCart} />
      <Routes>
        <Route
          path="/"
          element={<Navigate cart={cart} setCart={changeCart} to="/home" />}
        />
        <Route
          path="/home"
          element={<Home cart={cart} setCart={changeCart} />}
        ></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route
          path="/book/:id"
          element={<BookDetails cart={cart} setCart={changeCart}></BookDetails>}
        ></Route>
        <Route
          path="/category/:category/:page"
          element={<Category cart={cart} setCart={changeCart} />}
        ></Route>
        <Route
          path="/search/:search/:page"
          element={<Search cart={cart} setCart={changeCart} />}
        ></Route>
        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={changeCart}></Cart>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
