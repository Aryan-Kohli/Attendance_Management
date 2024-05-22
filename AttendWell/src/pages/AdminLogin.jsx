import React, { useState, useEffect } from "react";
import "../css/AdminLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function loginAdmin() {
    if (username === "") {
      alert("Please enter your username");
      return;
    }
    if (password === "") {
      alert("Please enter your password");
      return;
    }
    try {
      const teacher = {
        username: username,
        password: password,
      };
      // console.log(teacher);
      const response = await axios.post("/teacher/loginTeacher", {
        username: username,
        password: password,
      });
      // console.log(response.data);
      Cookies.set("adminjwt", response.data, { expires: 1 });
      navigate("/admin/dashboard");
    } catch (e) {
      if (e.response.status === 401) {
        alert("Invalid Password");
      } else {
        alert("Invalid Username");
      }
      console.log(e);
    }

    // alert("Login Successful");
  }
  async function guestlogin() {
    try {
      // console.log(teacher);
      const response = await axios.post("/teacher/loginTeacher", {
        username: "JohnDoe19",
        password: "password",
      });
      // console.log(response.data);
      Cookies.set("adminjwt", response.data, { expires: 1 });
      navigate("/admin/dashboard");
    } catch (e) {
      if (e.response.status === 401) {
        alert("Invalid Password");
      } else {
        alert("Invalid Username");
      }
      console.log(e);
    }
  }
  function gotoregister() {
    navigate("/admin/register");
  }
  return (
    <div className="mt-4 container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="adminloghead">Admin Login</h1>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-4 offset-md-2">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control registerboxinp"
              id="floatingUsername"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="labeltxt" for="floatingUsername">
              Username
            </label>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-floating">
            <input
              type="password"
              className="form-control registerboxinp"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="labeltxt" for="floatingPassword">
              Password
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 offset-md-2">
          <div className="mt-4">
            <button
              type="button"
              className="adminloginbtn"
              onClick={loginAdmin}
            >
              Login
            </button>
          </div>
        </div>
        <div className="col-md-3">
          <div className="">
            {/* <h6>Register a new admin</h6> */}
            <button
              type="button"
              className="RegisterBtnadminpage mt-3"
              onClick={gotoregister}
            >
              Register
            </button>
            <h6 className="registerSugg">Register a new admin ?</h6>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 mt-3">
          <div className="">
            {/* <h6>Register a new admin</h6> */}
            <button
              type="button"
              className="RegisterBtnadminpage "
              onClick={guestlogin}
            >
              Guest Login
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-5  ">
          <button
            type="button"
            className="btn back2btn btn-outline-danger"
            onClick={() => navigate("/login")}
          >
            GO BACK
          </button>
        </div>
      </div>
      <div className="faltudiv"></div>
    </div>
  );
}
