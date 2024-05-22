import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Welcomepage from "./pages/Welcomepage.jsx";
import Loginpage from "./pages/Loginpage.jsx";
import FacultyLogin from "./pages/FacultyLogin.jsx";
import StudentLogin from "./pages/StudentLogin.jsx";
import AdminRegister from "./pages/AdminRegister.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminMainPage from "./pages/AdminMainPage.jsx";
import AdminClassroom from "./pages/AdminClassroom.jsx";
import FacultyClassroom from "./pages/FacultyClassroom.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
axios.defaults.baseURL = "http://localhost:3000";
// axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.withCredentials = true;
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcomepage />} />{" "}
          <Route path="/login" element={<Loginpage />}></Route>
          <Route path="/admin/register" element={<AdminRegister />}></Route>
          <Route path="/admin/login" element={<AdminLogin />}></Route>
          <Route path="/faculty/login" element={<FacultyLogin />}></Route>
          <Route path="/student/login" element={<StudentLogin />}></Route>
          <Route path="/admin/dashboard" element={<AdminMainPage />}></Route>
          <Route
            path="/faculty/dashboard"
            element={<FacultyClassroom />}
          ></Route>
          <Route
            path="/admin/editclassroom"
            element={<AdminClassroom />}
          ></Route>
          <Route
            path="/student/dashboard"
            element={<StudentDashboard />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
