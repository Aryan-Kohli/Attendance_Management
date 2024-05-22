import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Studentlogin.css";
import axios from "axios";
import Cookies from "js-cookie";
export default function StudentLogin() {
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [enrollNo, setEnrollNo] = useState("");
  const [className, setClassname] = useState("");
  async function studentLogin() {
    // if (className === "") {
    //   alert("Please enter your class name");
    //   return;
    // }
    if (Name === "") {
      alert("Please enter your Name");
      return;
    }
    if (orgName === "") {
      alert("Please enter your School / Institute Name");
      return;
    }
    if (enrollNo === "") {
      alert("Please enter your Enroll no. / Roll no.");
      return;
    }
    try {
      const data = {
        name: Name,
        orgname: orgName,
        enrollNo: enrollNo,
      };
      const response = await axios.post("/student/loginstudent", data);
      // console.log(response.data.token);
      Cookies.set("student", JSON.stringify(response.data.token));
      navigate("/student/dashboard");
      // console.log(response);
    } catch (e) {
      console.log(e);
    }

    // alert("Login Successful");
  }
  async function guestlogin() {
    try {
      const response = await axios.post("/student/loginstudent", {
        name: "Pooja Yadav",
        orgname: "ABC Institute",
        enrollNo: "1103",
      });
      // const response = await axios.post("/student/loginstudent", data);
      // console.log(response.data.token);
      Cookies.set("student", JSON.stringify(response.data.token));
      navigate("/student/dashboard");
      // console.log(response);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <h1 className="adminloghead">Student Login</h1>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-4 offset-md-2">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control registerboxinp"
              id="floatingName"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <label className="labeltxt" for="floatingName">
              Student Name
            </label>
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control registerboxinp"
              id="floatingenrollNo"
              placeholder="enrollNo"
              onChange={(e) => setEnrollNo(e.target.value)}
            />
            <label className="labeltxt" for="floatingenrollNo">
              Enroll no. / Roll no.
            </label>
          </div>
        </div>

        <div className="col-md-4 offset-md-4">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control registerboxinp"
              id="floatingorgName"
              placeholder="orgName"
              onChange={(e) => setOrgName(e.target.value)}
            />
            <label className="labeltxt" for="floatingorgName">
              School / Institute Name
            </label>
          </div>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-lg-4">
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingclassName"
              placeholder="className"
              onChange={(e) => setClassname(e.target.value)}
            />
            <label for="floatingclassName">Class Name</label>
          </div>
        </div>
      </div> */}
      <div>
        <div className="row">
          <div className="col-md-4 offset-md-2">
            <button
              type="button"
              className="adminloginbtn"
              onClick={studentLogin}
            >
              Login
            </button>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-3 offset-md-2">
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
      </div>
      <div className="faltudiv"></div>
    </div>
  );
}
