import React, { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
export default function ({ defaultVal }) {
  let [authMode, setAuthMode] = useState(defaultVal);
  const { userGlobal } = useContext(AuthContext);
  const { authState, setAuthState } = userGlobal;
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    let data = {
      username: event.target[0].value,
      password: event.target[1].value,
      f_name: event.target[2].value
    };

    let url = "http://localhost:5000/api/auth/register";
    data = {
      ...data,
      email: event.target[3].value,
    };

    const apiCall = async (url, data) => {
      await axios
        .post(url, data)
        .then((res) => {
          alert("success");
          navigate("/signin");
        })
        .catch((err) => {
          console.log(err.response);
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
              placeholder="Name"
            />
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Name"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
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
            <a
            href="/signin"
              className="link-primary"
      
              style={{ cursor: "pointer" }}
            >
              Sign In
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
