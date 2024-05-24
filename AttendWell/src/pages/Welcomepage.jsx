import React from "react";
import "../css/WelcomePage.css";
import attend_ani from "../assets/attend_ani.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import Faculty_download from "../assets/Faculty_download.png";
import detainedPdf from "../assets/detainedPdf.png";
import download_list from "../assets/download_list.png";
import logins from "../assets/logins.png";
import linkedin from "../assets/linkedin.webp";
export default function Welcomepage() {
  const navigate = useNavigate();
  function gotoLogin() {
    console.log("clicked");
    navigate("/login");
  }
  return (
    <>
      <div className="welcome container">
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12  mainHeadDiv">
                <h1 className="mainHead">
                  Welcome to <span className="spannn">AttendWell</span>
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h3 className="mainPara">
                  It is a simple and easy to use platform that helps you to keep
                  track of your attendance and helps you to manage your time
                  effectively. Administrators can easily manage their
                  institution, create classes and add students to the classes.
                  Faculty members can easily add attendance of students and view
                  the attendance of students. Students can easily view their
                  attendance by entering their name, class name and Institute
                  name.
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-15 btndiv">
                <button className="started" onClick={gotoLogin}>
                  Get Started
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="leftimg">
              <Lottie loop={true} animationData={attend_ani} />{" "}
            </div>
          </div>
        </div>
        <div className="row downdiv">
          <div className="col-md-12">
            <div className="row">
              <div className="col">
                <h1 className="howHead">How it Works?</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <h3 className="howSteps">
                  Step 1: The Adminstratiors will register their institution,
                  create classes and add subjects & students to the classes.
                </h3>
              </div>
              <div className="col-12">
                <h3 className="howSteps">
                  Step 2: Administrators will provide classname & class password
                  to Faculties/teachers.
                </h3>
              </div>
              <div className="col-12">
                <h3 className="howSteps">
                  Step 3: Faculty can easily login using class name & password
                  and add & see attendance of all students in class.
                </h3>
              </div>
              <div className="col-12">
                <h3 className="howSteps">
                  Step 4: Students can view their attendance by entering their
                  name , class name & Institute name.
                </h3>
              </div>
              <div className="col-md-12">
                <img src={logins} alt="" className="pic4" />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h1 className="howHead">Features </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h3 className="howSteps">
                  1. Administrators can easily download the list of their
                  students of each class.
                </h3>
              </div>
              <div className="col-md-12">
                <img src={download_list} alt="" className="pic3" />
              </div>
              <div className="col-md-12">
                <h3 className="howSteps">
                  2. Faculty Members can eaily download the list of detained
                  Students.
                </h3>
              </div>
              <div className="col-md-12">
                <img src={Faculty_download} alt="" className="pic1" />
              </div>
              <div className="col-md-12 mt-3">
                <img src={detainedPdf} alt="" className="pic2" />
              </div>
            </div>
          </div>
        </div>
        <div className="faltudiv"></div>
      </div>
      <div className="container-fluid footer">
        <div className="row">
          <div className="col-md-12">
            <h5 className="footerHead">
              Designed and developed by Aryan Kohli{" "}
              <a href="https://www.linkedin.com/in/aryankohli1908/">
                <img src={linkedin} alt="" className="linkedin" />
              </a>
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}
