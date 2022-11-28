import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navi from "./components/Navi";
import Home from "./components/Home";
import BookDetails from "./components/BookDetails";
import Auth from "./components/Auth";
import Category from "./components/Category";
import Cart from "./components/Cart";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";
import Profile from "./components/Profile";
const App = () => {
  const [cart, setCart] = useState(0);
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  useEffect(() => {
    let quantity = 0;
    if (localStorage.getItem("group100_cart") !== null) {
      let arr = JSON.parse(localStorage.getItem("group100_cart"));
      for (let key in arr) {
        if (arr.hasOwnProperty(key)) {
          quantity += parseInt(arr[key]["quantity"]);
        }
      }
    }
    setCart(quantity);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          console.log(response.data.username)
          console.log("success full authenticate");
        }
      });
  }, []);


  const changeCart = (value) => {
    setCart(value);
  };
  return (
    <AuthContext.Provider value={{userGlobal:{ authState, setAuthState },cartGlobal:{cart, setCart}}}>
      <BrowserRouter>
        <Navi />
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/home" />}
          />
          <Route
            path="/home"
            element={<Home />}
          ></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route
            path="/book/:id"
            element={
              <BookDetails></BookDetails>
            }
          ></Route>
          <Route
            path="/cart"
            element={<Cart></Cart>}
          ></Route>
          <Route path="/user/:id" element={<Profile></Profile>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
