import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "../css/Facultylogin.css";
export default function FacultyLogin() {
  const [className, setClassname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function facultyLogin() {
    if (className === "") {
      alert("Please enter your class name");
      return;
    }
    if (password === "") {
      alert("Please enter your password");
      return;
    }
    // alert("Login Successful");
    try {
      const response = await axios.post("/classroom/getclassroom", {
        Classname: className,
        password: password,
      });
      console.log(response.data);
      Cookies.set("facultyjwt", response.data, { expires: 1 });
      navigate("/faculty/dashboard");
    } catch (e) {
      console.log(e);
    }
  }
  // T18_B12
  async function guestlogin() {
    try {
      const response = await axios.post("/classroom/getclassroom", {
        Classname: "T18_B12",
        password: "pass",
      });
      console.log(response.data);
      Cookies.set("facultyjwt", response.data, { expires: 1 });
      navigate("/faculty/dashboard");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <h1 className="adminloghead">Faculty Login</h1>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-4 offset-md-2">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control registerboxinp"
              id="floatingClassname"
              placeholder="ClassName"
              onChange={(e) => setClassname(e.target.value)}
            />
            <label className="labeltxt" for="floatingClassName">
              ClassName
            </label>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="form-floating mb-3">
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
      <div>
        <div className="row">
          <div className="col-md-4 offset-md-2">
            <button
              type="button"
              className="adminloginbtn"
              onClick={facultyLogin}
            >
              Login
            </button>
          </div>
          <div className="col-md-4 offset-md-2">
            <button
              type="button"
              className="adminloginbtn"
              onClick={guestlogin}
            >
              Guest Login
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="row mt-4">
          <div className="col-md-5">
            <button
              type="button"
              className="btn back2btn btn-outline-danger"
              onClick={() => navigate("/login")}
            >
              GO BACK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
