import React, { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
export default function () {
  const { userGlobal } = useContext(AuthContext);
  const { authState, setAuthState } = userGlobal;
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let url = "http://localhost:5000/api/auth/login";
    let data = {
      username: event.target[0].value,
      password: event.target[1].value,
    };
    const apiCall = async (url, data) => {
      await axios
        .post(url, data)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          setAuthState({
            username: res.data.username,
            id: res.data._id,
            status: true,
          });
          navigate("/home");
        })
        .catch((err) => {
            console.log(err)
        });
    };
    apiCall(url, data);
  };

  if (authState.status) {
    return <Navigate to="/home"></Navigate>;
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>

          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1 no_border"
              placeholder="Username"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1 no_border"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="bg-indigo-600 btn text-white hover:opacity-1">
              Submit
            </button>
          </div>
          <div className="text-center">
            Not registered yet?{" "}
            <a href="/signup" className="link-primary">
              Sign Up
            </a>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}
