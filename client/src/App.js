import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navi from "./components/Nav/Navi";
import Home from "./components/Home/Home";
import BookDetails from "./components/Book/BookDetails";

import Cart from "./components/Cart/Cart";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";
import Profile from "./components/User/Profile";
import Details from "./components/User/Details";
import Banner from "./components/Banner/Banner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Search from "./components/Search/Search";
import Example from "./components/Book/Book";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import News from "./components/News/News";
import Footer from "./components/Footer/Footer";
import Chat from "./components/ChatEngine/Chat"
import Blog from "./components/Blog/Blog";
import ChatAll from "./components/ChatEngine/ChatAll";
import './index.css'
const App = () => {
  const [cart, setCart] = useState(0);
  const [page, setPage] = useState("Home");
  const [authState, setAuthState] = useState({
    username: "",
    id: '',
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
      .catch((err) => {
        setAuthState({ username:'',id:'', status: false })
      });
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
        {/* <ChatEngine></ChatEngine> */}
                <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />}></Route>
          <Route path="/books" element={<Example />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/book/:id" element={<BookDetails></BookDetails>}></Route>
          <Route path="/search/:search" element={<Search />}></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route path="/user/profile" element={<Profile></Profile>}></Route>
          <Route path="/news" element={<News></News>}></Route>
          <Route
            path="/user/order/details/:orderId"
            element={<Details></Details>}
          ></Route>
          <Route path="/chat" element={<ChatAll></ChatAll>}></Route>
          <Route path="/blogs" element={<Blog/>}></Route>
        </Routes>
        <Footer/>
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
        <Chat></Chat>
      </BrowserRouter>
      {/* <ScrollToTop smooth top={100} /> */}
    </AuthContext.Provider>
  );
};

export default App;
