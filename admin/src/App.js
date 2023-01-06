import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";
import Auth from "./components/Auth";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
// import Aside from "./components/Aside";
import DashBoard from "./components/DashBoard";
import Order from "./components/Order";
import Product from "./components/Product";
import User from "./components/User";
import Chat from "./components/chat/Chat";
import Blog from "./components/Blog";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ChatIcon from "@mui/icons-material/Chat";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import HistoryIcon from "@mui/icons-material/History";
import ForumIcon from "@mui/icons-material/Forum";
import Sicbo from "./components/Sicbo";
import LogoutIcon from "@mui/icons-material/Logout";
const App = () => {
  const [authState, setAuthState] = useState({
    username: "",
    id: "",
    status: false,
  });
  const { collapseSidebar } = useProSidebar();
  const [collapse, setCollapse] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/admin", {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        console.log("render");
      })
      .catch((err) => {
        console.log(err.message);
        setAuthState({ username: "", id: "", status: false });
      });
  }, []);
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <BrowserRouter>
        <div className="d-flex h-full">
          {authState.status && (
            <Sidebar>
              <Menu>
                <MenuItem href="/dashboard">
                  <div
                    className={`flex justify-between ${!collapse && "mx-4"}`}
                  >
                    {!collapse && <span>Dashboard</span>}
                    <DashboardIcon></DashboardIcon>
                  </div>
                </MenuItem>

                <MenuItem href="/chat">
                  <div
                    className={`flex justify-between ${!collapse && "mx-4"}`}
                  >
                    {!collapse && <span>Chat</span>}
                    <ChatIcon></ChatIcon>
                  </div>
                </MenuItem>
                <MenuItem href="/blog">
                  <div
                    className={`flex justify-between ${!collapse && "mx-4"}`}
                  >
                    {!collapse && <span>Blog</span>}
                    <ForumIcon></ForumIcon>
                  </div>
                </MenuItem>
                <MenuItem href="/product">
                  <div
                    className={`flex justify-between ${!collapse && "mx-4"}`}
                  >
                    {!collapse && <span>Product</span>}
                    <MenuBookIcon></MenuBookIcon>
                  </div>
                </MenuItem>
                <MenuItem href="/order">
                  <div
                    className={`flex justify-between ${!collapse && "mx-4"}`}
                  >
                    {!collapse && <span>Order</span>}
                    <HistoryIcon></HistoryIcon>
                  </div>
                </MenuItem>
                <MenuItem href="/sicbo">
                  <div
                    className={`flex justify-between ${!collapse && "mx-4"}`}
                  >
                    {!collapse && <span>Sicbo</span>}
                    <HistoryIcon></HistoryIcon>
                  </div>
                </MenuItem>
                <MenuItem href="/user">
                  <div
                    className={`flex justify-between ${!collapse && "mx-4"}`}
                  >
                    {!collapse && <span>User</span>}
                    <PeopleIcon></PeopleIcon>
                  </div>
                </MenuItem>
                <MenuItem
                  href="/login"
                  onClick={() => {
                    sessionStorage.clear();
                  }}
                >
                  <div
                    className={`flex justify-between ${!collapse && "mx-4"}`}
                  >
                    {!collapse && <span>Logout</span>}
                    <LogoutIcon></LogoutIcon>
                  </div>
                </MenuItem>
                {/* <SubMenu label="Charts">
                  <MenuItem> Pie charts </MenuItem>
                  <MenuItem> Line charts </MenuItem>
                </SubMenu> */}
              </Menu>
            </Sidebar>
          )}

          <div className="h-[100vh] flex flex-col w-full">
            {authState.status && (
              <div className="p-3 flex justify-start align-items-start">
                <MenuIcon
                  className="cursor-pointer"
                  fontSize="large"
                  onClick={() => {
                    collapseSidebar();
                    setCollapse(!collapse);
                  }}
                ></MenuIcon>{" "}
              </div>
            )}

            <div className="w-full flex justify-center">
              <Routes>
                <Route
                  path="/"
                  element={
                    authState.status ? (
                      <Navigate to="/dashboard" />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route path="/login" element={<Auth />}></Route>
            

                {authState.status && (
                  <>
                    <Route path="/dashboard" element={<DashBoard />}></Route>
                    <Route path="/order" element={<Order />}></Route>
                    <Route path="/product" element={<Product />}></Route>
                    <Route path="/user" element={<User />}></Route>
                    <Route path="/chat" element={<Chat></Chat>}></Route>
                    <Route path="/blog" element={<Blog></Blog>}></Route>
                    <Route path="/sicbo" element={<Sicbo></Sicbo>}></Route>
                  </>
                )}
                    {/* <Route path="*" element={<Navigate to="/login"/>} /> */}
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
