import React from "react";
import "../css/LoginPage.css";
import { useNavigate } from "react-router-dom";
export default function Loginpage() {
  const naigation = useNavigate();
  function gotoAdminLogin() {
    naigation("/admin/register");
  }
  function gotoFacultyLogin() {
    naigation("/faculty/login");
  }
  function gotoStudentLogin() {
    naigation("/student/login");
  }
  return (
    <div className="loginPage container">
      <div className="chooseOne">
        <h1 className="chooseoneop">Choose one option: </h1>
      </div>
      <div className="loginRow row ">
        <div className="loginEle col-md-3" onClick={gotoAdminLogin}>
          Login as Admin
        </div>
        <div
          className="loginEle col-md-3 offset-md-1"
          onClick={gotoFacultyLogin}
        >
          Login as Faculty
        </div>
        <div
          className="loginEle col-md-3 offset-md-1"
          onClick={gotoStudentLogin}
        >
          Login as Student
        </div>
      </div>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-5">
            <button
              type="button"
              className=" backbtn"
              onClick={() => naigation("/")}
            >
              GO BACK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
