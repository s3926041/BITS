import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";
import Auth from "./components/Auth";

import Aside from "./components/Aside";
import DashBoard from "./components/DashBoard";
import Order from "./components/Order";
import Product from "./components/Product";
import User from "./components/User";
import Chat from "./components/Chat"
const App = () => {
  const [authState, setAuthState] = useState({
    username: "",
    id: '',
    status: false,
  });
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/admin", {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (!response.data.error) {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        setAuthState({ username:'',id:'', status: false })
      });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <BrowserRouter>
      <div className="d-flex">
      <Chat></Chat>
   
      {authState && <Aside></Aside>}
      
        <Routes>
          <Route
            path="/"
            element={
              authState ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<Auth />}></Route>
          <Route path="/dashboard" element={<DashBoard />}></Route>
          <Route path="/order" element={<Order />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/chat" element={<Chat></Chat>}></Route>
        </Routes>
      </div>
        
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
