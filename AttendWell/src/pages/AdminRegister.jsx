import React, { useState, useEffect } from "react";
import "../css/AdminRegister.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function AdminRegister() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [orgname, setOrgname] = useState("");
  const [classrooms, setClassrooms] = useState([]);

  async function registerAdmin() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name === "") {
      alert("Please enter your name");
      return;
    }
    if (username === "") {
      alert("Please enter your username");
      return;
    }
    if (password === "") {
      alert("Please enter your password");
      return;
    }
    if (email === "") {
      alert("Please enter your email");
      return;
    }
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email");
      return;
    }
    if (orgname === "") {
      alert("Please enter your organization name");
      return;
    }
    const teacher = {
      name: name,
      username: username,
      password: password,
      email: email,
      orgname: orgname,
      classrooms: classrooms,
    };
    try {
      const response = await axios.post("/teacher/addTeacher", teacher);
      console.log(response.data);
      alert("Registration Successful");
      navigate("/admin/login");
    } catch (err) {
      console.log(err);
    }
  }
  function gotologin() {
    navigate("/admin/login");
  }

  return (
    <div className="container mb-4">
      <div className="row">
        <div className="col-md-5 registerLeft">
          <div>
            <h1 className="formhead">New Register</h1>
          </div>
          <div className="formdiv">
            <div className="row">
              <div className="col-lg-12">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control registerboxinp"
                    id="floatingName"
                    placeholder="John Doe"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label className="labeltxt" for="floatingName">
                    Name
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control registerboxinp"
                    id="floatingEmail"
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="labeltxt" for="floatingEmail">
                    Email address
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control registerboxinp"
                    id="floatingUsername"
                    placeholder="John123Doe"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label className="labeltxt" for="floatingUsername">
                    Username
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control registerboxinp"
                    id="floatingPassword"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="labeltxt" for="floatingPassword">
                    Password
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control registerboxinp"
                    id="floatingOrgname"
                    placeholder="Organization Name"
                    onChange={(e) => setOrgname(e.target.value)}
                  />
                  <label className="labeltxt" for="floatingOrgname">
                    Organization name
                  </label>
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                className="registerbtn"
                onClick={registerAdmin}
              >
                Register
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-5 offset-md-1 mt-4 registerright">
          <div className="mt-4">
            <div className="row">
              <h1 className="alreadyhead">Already Registered?</h1>
            </div>
            <div className="row">
              <div className="col-md-6">
                <button onClick={gotologin} className="btn backbtn">
                  Login
                </button>
              </div>
              <div className="col-md-6">
                <button
                  type="button"
                  className="btn backbtn"
                  onClick={() => navigate("/login")}
                >
                  GO BACK
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="faltudiv"></div>
      </div>
    </div>
  );
}
// name , username , password, email, orgname , classrooms
