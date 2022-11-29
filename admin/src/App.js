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

const App = () => {
  const [authState, setAuthState] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/admin", {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (!response.data.error) {
          setAuthState(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <BrowserRouter>
        {authState && <Aside></Aside>}
        <Routes>
          {/* <Route
            path="/"
            element={
              authState ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          /> */}
          <Route path="/login" element={<Auth />}></Route>
          <Route path="/dashboard" element={<DashBoard />}></Route>
          <Route path="/order" element={<Order />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/user" element={<User />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
