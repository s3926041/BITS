import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navi from "./components/Nav/Navi";
import Home from "./components/Home";
import BookDetails from "./components/Book/BookDetails";
import Auth from "./components/Auth/Auth";
import Cart from "./components/Cart/Cart";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";
import Profile from "./components/User/Profile";
import General from "./components/User/General";
import Details from "./components/User/Details";
import Banner from "./components/Banner";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [cart, setCart] = useState(0);
  const [page, setPage] = useState("Home");
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
          console.log("LOGGED IN AS " + response.data.username);
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userGlobal: { authState, setAuthState },
        cartGlobal: { cart, setCart },
        pageGlobal: { page, setPage },
      }}
    >
      <BrowserRouter>
        <Navi />
        <Banner />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/book/:id" element={<BookDetails></BookDetails>}></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route path="/user/profile" element={<Profile></Profile>}></Route>
          <Route
            path="/user/order/general"
            element={<General></General>}
          ></Route>
          <Route
            path="/user/order/details/:orderId"
            element={<Details></Details>}
          ></Route>
        </Routes>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
