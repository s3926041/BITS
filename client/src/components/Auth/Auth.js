import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";

export default function () {
  let [authMode, setAuthMode] = useState("signin");
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
    if (authMode !== "signin") {
      url = "http://localhost:5000/api/auth/register";
      data = {
        ...data,
        email: event.target[2].value,
      };
    }
    const apiCall = async (url, data) => {
      await axios
        .post(url, data)
        .then((res) => {
          alert('success')
          if (authMode == "signin") {
            localStorage.setItem("token", res.data.token);
            setAuthState({
              username: res.data.username,
              id: res.data._id,
              status: true,
            });
            navigate("/home");
          } else {
            setAuthMode("signin")
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    apiCall(url, data);
  };

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };
  if (authState.status) {
    return <Navigate to="/home"></Navigate>;
  }

  if (authMode === "signin") {
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
              <button type="submit" className="btn btn-primary no_border">
                Submit
              </button>
            </div>
            <div className="text-center">
              Not registered yet?{" "}
              <span
                className="link-primary"
                onClick={changeAuthMode}
                style={{ cursor: "pointer" }}
              >
                Sign Up
              </span>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>

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
              placeholder="Password"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <div className="text-center mt-3">
            Already registered?{" "}
            <span
              className="link-primary"
              onClick={changeAuthMode}
              style={{ cursor: "pointer" }}
            >
              Sign In
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
