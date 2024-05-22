import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/AdminClassroom.css";
import AllList from "../AllList";
import { PDFDownloadLink } from "@react-pdf/renderer";
export default function ClassroomMainPage() {
  const navigate = useNavigate();
  const [classdata, setclassdata] = useState(null);
  const [newsubject, setNewSubject] = useState("");
  const [subjectmodal, setSubjectModal] = useState(false);
  const [studentmodal, setStudentModal] = useState(false);
  const [newstudentname, setNewStudentName] = useState("");
  const [newstudentrollno, setNewStudentRollNo] = useState("");
  const [students, setStudents] = useState([]);
  const [admin, setAdmin] = useState(null);
  useEffect(() => {
    const current = Cookies.get("selectedClassroom");
    const parsed = JSON.parse(current);
    if (parsed == null) {
      navigate("/admin/dashboard");
    }
    setclassdata(parsed);
  }, []);
  useEffect(() => {
    async function reteriveAdmin() {
      const adminjwt = Cookies.get("adminjwt");
      if (adminjwt === undefined) {
        navigate("/admin/login");
      } else {
        // console.log(adminjwt);
        const response = await axios.post("/teacher/getTeacher", null, {
          headers: {
            authorization: `Bearer ${adminjwt}`,
          },
        });
        console.log(response.data);
        setAdmin(response.data);
      }
    }
    async function classroomSet() {
      if (admin === null) return;
    }
    reteriveAdmin();
  }, []);
  useEffect(() => {
    async function getStudents() {
      if (classdata == null) return;
      const response = await axios.get(`/classroom/getbyid/${classdata._id}`);
      const response_students = response.data.Students;
      setStudents(response_students);
    }
    getStudents();
  }, [classdata]);
  function addSubjects() {
    setSubjectModal(true);
  }

  async function savenewSubject() {
    const regex = /^(?!\s*$)(?!0)(?!.*0\s*$).+/;
    if (!regex.test(newsubject)) {
      alert("Please enter valid subject name");
      setNewSubject("");
      return;
    }

    setNewSubject("");
    setSubjectModal(false);
    try {
      const oldsubjects = classdata.Subjects;
      oldsubjects.push(newsubject);
      const response = await axios.put(
        `/classroom/updateclassroom/${classdata._id}`,
        { Subjects: oldsubjects }
      );
      Cookies.set("selectedClassroom", JSON.stringify(response.data), {
        expires: 1,
      });
      const current = Cookies.get("selectedClassroom");
      const parsed = JSON.parse(current);
      setclassdata(parsed);
      console.log(parsed.Subjects);
    } catch (e) {
      console.log(e);
    }
    // alert(`new subject is "${newsubject}"`);
  }
  function cancelnewsubject() {
    setNewSubject("");
    setSubjectModal(false);
  }
  function addStudents() {
    if (classdata.Subjects == null || classdata.Subjects.length == 0) {
      alert("Please add subjects first");
      return;
    }

    setStudentModal(true);
  }
  async function savenewStudent() {
    const regex = /^(?!\s*$)(?!0)(?!.*0\s*$).+/;
    if (!regex.test(newstudentname)) {
      alert("Please enter valid student name");
      setNewStudentName("");
      setNewStudentRollNo("");
      setStudentModal(false);
      return;
    }
    if (!regex.test(newstudentrollno)) {
      alert("Please enter valid student rollno");
      setNewStudentName("");
      setNewStudentRollNo("");
      setStudentModal(false);
      return;
    }
    try {
      var stud_data = [];
      for (var i = 0; i < classdata.Subjects.length; i++) {
        stud_data.push({
          className: classdata.className,
          subject: classdata.Subjects[i],
        });
      }
      const response = await axios.post("/student/addStudent", {
        name: newstudentname,
        enrollNo: newstudentrollno,
        data: stud_data,
        orgname: admin.orgname,
      });
      // console.log(response.data);
      const oldstudents = classdata.Students;
      oldstudents.push(response.data._id);
      const response2 = await axios.put(
        `/classroom/updateclassroom/${classdata._id}`,
        { Students: oldstudents }
      );
      Cookies.set("selectedClassroom", JSON.stringify(response2.data), {
        expires: 1,
      });
      setclassdata(response2.data);
    } catch (e) {
      console.log(e);
    }
    setNewStudentName("");
    setNewStudentRollNo("");
    setStudentModal(false);
  }
  function cancelnewStudent() {
    setNewStudentName("");
    setNewStudentRollNo("");
    setStudentModal(false);
  }
  function gotodashboard() {
    navigate("/admin/dashboard");
  }
  return (
    <div className="container-fluid">
      {classdata && (
        <div className="row adminclasstop">
          <div className="topline">
            <div className="topdata">{classdata.className}</div>
            <div className="topdata">{classdata.Branch}</div>
            <div className="topdata">{classdata.Batch}</div>
          </div>
          <div className="bottomline">
            <div className="topdata">
              Total Students :{" "}
              {classdata.Students ? classdata.Students.length : 0}
            </div>
            <div className="topdata">
              Total Subjects :{" "}
              {classdata.Subjects ? classdata.Subjects.length : 0}
            </div>
          </div>
        </div>
      )}
      {classdata && classdata.Subjects && classdata.Subjects.length > 0 && (
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-12 Subjecthead">Subjects:</div>
            <div className="row">
              {classdata.Subjects.map((subject, index) => (
                <div className="col-md-2 subData" key={index}>
                  {subject}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-4 mt-3">
            <button type="button" className="btns2" onClick={addSubjects}>
              + Add Subject
            </button>
          </div>
          <div className=" col-md-4 mt-3">
            <button type="button" className="btns2" onClick={addStudents}>
              + Add Student
            </button>
          </div>
          <div className="col-md-4 mt-4">
            {classdata && (
              <PDFDownloadLink
                document={<AllList classroom={classdata} students={students} />}
                fileName="List.pdf"
                style={{
                  color: "#d6c889",
                  backgroundColor: "#26272f",
                  fontSize: 16,
                  fontWeight: "800",
                  borderRadius: 10,
                  paddingBlock: 10,
                  paddingInline: 20,
                  border: "none",
                  textDecoration: "none",
                  fontFamily: "Noto Serif",
                }}
              >
                Download list
              </PDFDownloadLink>
            )}
          </div>
        </div>
      </div>
      {subjectmodal && (
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-6">
              <h6 className="head2">Enter Subject Name:</h6>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-4">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control registerboxinp"
                  id="floatingUsername"
                  placeholder="Username"
                  onChange={(e) => setNewSubject(e.target.value)}
                />
                <label className="labeltxt" htmlFor="floatingUsername">
                  Subject Name
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <button
                type="button"
                className="btn btn-outline-success mybtn2"
                onClick={savenewSubject}
              >
                Save
              </button>
            </div>
            <div className="col-md-3">
              <button
                type="button"
                className="btn btn-outline-danger mybtn2"
                onClick={cancelnewsubject}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {studentmodal && (
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-6">
              <h6 className="head2">Enter Student details:</h6>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-4">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control registerboxinp"
                  id="floatingName"
                  placeholder="Name"
                  onChange={(e) => setNewStudentName(e.target.value)}
                />
                <label className="labeltxt" htmlFor="floatingName">
                  Name
                </label>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-4">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control registerboxinp"
                  id="floatingRollNo"
                  placeholder="RollNo"
                  onChange={(e) => setNewStudentRollNo(e.target.value)}
                />
                <label className="labeltxt" htmlFor="floatingRollNo">
                  Enroll / Admission / Roll No.
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <button
                type="button"
                className="btn btn-outline-success mybtn2"
                onClick={savenewStudent}
              >
                Save
              </button>
            </div>
            <div className="col-md-3">
              <button
                type="button"
                className="btn btn-outline-danger mybtn2"
                onClick={cancelnewStudent}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {classdata && classdata.Students && classdata.Students.length > 0 && (
        <div className="container mt-4">
          <div className="row">
            <div className="StudentHead">Students: </div>
          </div>
          {students.map((student, index) => (
            <div className="row" key={index}>
              <div className="col-6 studentdata">{student.name}</div>
              <div className="col-4 studentdata">{student.enrollNo}</div>
            </div>
          ))}
        </div>
      )}
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-4">
            <button type="button" className="dashbtn" onClick={gotodashboard}>
              Dashboard
            </button>
          </div>
        </div>
      </div>
      <div className="faltudiv"></div>
    </div>
  );
}
