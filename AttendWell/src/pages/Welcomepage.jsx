import React from "react";
import "../css/WelcomePage.css";
import attend_ani from "../assets/attend_ani.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

export default function Welcomepage() {
  const navigate = useNavigate();
  function gotoLogin() {
    console.log("clicked");
    navigate("/login");
  }
  return (
    <div className="welcome">
      <div className="row">
        <div className="col-md-7 leftDiv">
          <div className="row">
            <div className="col-md-8 offset-1 mainHeadDiv">
              <h1 className="mainHead">
                Welcome to <span className="spannn">AttendWell</span>
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10">
              <h3 className="mainPara">
                It is a simple and easy to use platform that helps you to keep
                track of your attendance and helps you to manage your time
                effectively. Adminstratiors will register their institution,
                create classes and add students to the classes. Subject Teachers
                can easily add their subject attendance . Students can view
                their attendance .
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 btndiv">
              <button className="startbtn" onClick={gotoLogin}>
                {" "}
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div>
            {/* <Lottie loop={true} animationData={attend_ani} />{" "} */}
          </div>
        </div>
      </div>
      <div className="faltudiv"></div>
    </div>
  );
}
