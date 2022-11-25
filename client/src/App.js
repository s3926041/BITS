import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getPosts } from "./actions/posts";
import Navi from "./components/Navi";
import Home from "./components/Home";
import BookDetails from "./components/BookDetails";
import Auth from "./components/Auth";
import axios from "axios";
import Category from "./components/Category";
import Search from "./components/Search";
const App = () => {
  return (
    <BrowserRouter>
      <Navi/>
      <Routes>
        <Route
          path="/home"
          element={<Home/>}
        ></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/book/:id" element={<BookDetails></BookDetails>}></Route>
        <Route path="/category/:category/:page" element={<Category/>}></Route>
        <Route path="/search/:search/:page" element={<Search/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
