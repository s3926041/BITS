import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

export default function () {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    let url = "http://localhost:5000/api/auth/loginAdmin";
    let data = {
      username: event.target[0].value,
      password: event.target[1].value,
    };
    const apiCall = async (url, data) => {
      await axios
        .post(url, data)
        .then((res) => {
          sessionStorage.setItem("token", res.data.token);
          // navigate("/dashboard");
          window.location.href = '/dashboard';
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    apiCall(url, data);
  };

  if (authState.status) {
    navigate("/dashboard");
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
              className="form-control mt-1"
              placeholder="Username"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <a href="/dashboard">
              {" "}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
