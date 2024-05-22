import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker";
import "../css/FacultyClassroom.css";
import "react-datepicker/dist/react-datepicker.css";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import DetainedList from "../DetainedList.jsx";
export default function FacultyClassroom() {
  const [classroom, setClassroom] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [array, setArray] = useState(Array(0).fill(false));
  const [students, setStudents] = useState([]);
  const [seedetained, setSeeDetained] = useState(false);
  const updateArrayPosition = (index) => {
    setArray((prevArray) =>
      prevArray.map((item, i) => (i === index ? !item : item))
    );
  };
  const [seeattendance, setSeeAttendance] = useState(false);
  const [alldates, setAllDates] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function checkLogin() {
      if (Cookies.get("facultyjwt") === undefined) {
        navigate("/faculty/login");
      } else {
        try {
          const token = Cookies.get("facultyjwt");
          console.log("cookie is ", token);
          const response = await axios.post("/classroom/getbyjwt", {
            token: token,
          });
          console.log(response.data);
          setClassroom(response.data);
        } catch (e) {
          console.log(e);
          // navigate("/faculty/login");
        }
      }
    }

    checkLogin();
  }, []);
  useEffect(() => {
    if (classroom && classroom.Subjects) setSubjects(classroom.Subjects);
  }, [classroom]);
  useEffect(() => {
    if (classroom && classroom.Students) setStudents(classroom.Students);
  }, [classroom]);
  useEffect(() => {
    if (classroom && classroom.Students)
      setArray(Array(classroom.Students.length).fill(false));
  }, [classroom]);
  function logout() {
    Cookies.remove("facultyjwt");
    navigate("/faculty/login");
  }
  const handleDateChange = (date) => {
    setStartDate(date);
  };
  function setvisibleattendance() {
    if (!seeattendance && !selectedSubject) {
      alert("Please select a subject");
      return;
    } else {
      setSeeAttendance(!seeattendance);
    }
  }
  async function saveData() {
    if (!selectedSubject) {
      alert("Please select a subject");
      return;
    }
    for (var i = 0; i < array.length; i++) {
      var flag = 0;
      // console.log("lentgh is ",students[i].)
      for (var j = 0; j < students[i].data.length; j++) {
        // console.log("here");

        if (
          students[i].data[j].subject == selectedSubject &&
          students[i].data[j].className == classroom.className
        ) {
          students[i].data[j].classData.push({
            date: startDate,
            attendance: array[i],
          });
          flag = 1;
          break;
        } else {
          //   if (i == 0) {
          //     console.log("i is", i);
          //     console.log(students[i].data[j].subject, selectedSubject);
          //     console.log(students[i].data[j].className, classroom.className);
          //   }
        }
      }
      if (flag == 0) {
        // console.log("hetre");
        students[i].data.push({
          subject: selectedSubject,
          className: classroom.className,
          classData: [{ date: startDate, attendance: array[i] }],
        });
      }
    }
    console.log(students);
    try {
      // console.log(typeof startDate);
      for (let index = 0; index < students.length; index++) {
        const _id = students[index]._id;

        const response = await axios.put(`/student/updatestudent/${_id}`, {
          data: students[index].data,
        });
        // console.log("updating student ", students[index].data[0]);
        console.log(response.data.data[0].classData);
      }
      // console.log("all are updated");
      alert("Attendance Successfully Marked");
      setStartDate(new Date());
      setArray(Array(students.length).fill(false));
      try {
        const token = Cookies.get("facultyjwt");
        console.log("cookie is ", token);
        const response = await axios.post("/classroom/getbyjwt", {
          token: token,
        });
        console.log(response.data);
        setClassroom(response.data);
      } catch (e) {
        console.log(e);
        // navigate("/faculty/login");
      }
      // const response = await axios.put(
      //   `/classroom/updateclassroom/${classroom._id}`,
      //   { Students: students }
      // );
      // setClassroom(response.data);
      // console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }
  const formatDate = (date) => {
    // const selectedDateOnly = new Date(date.setHours(0, 0, 0, 0));
    // const formattedDate = date.toISOString().split("T")[0];
    // return formattedDate;
    console.log(typeof date);
    return (
      date[8] +
      date[9] +
      date[7] +
      date[5] +
      date[6] +
      date[4] +
      date[0] +
      date[1] +
      date[2] +
      date[3]
    );
  };
  function handlesubjectchange(subject) {
    setSelectedSubject(subject);
    if (students.length > 0) {
      var arr = [];
      for (var i = 0; i < students[0].data.length; i++) {
        if (
          students[0].data[i].subject == subject &&
          students[0].data[i].className == classroom.className
        ) {
          for (var j = 0; j < students[0].data[i].classData.length; j++) {
            const dd = formatDate(students[0].data[i].classData[j].date);
            console.log(dd);
            arr.push(dd);
          }
          break;
        }
      }
      setAllDates(arr);
    }
  }

  return (
    <>
      <div className="container-fluid">
        {classroom && (
          <div className="row adminclasstop">
            <div className="topline ">
              <div className="topdata">{classroom.className}</div>
              <div className="topdata">{classroom.Branch}</div>
              <div className="topdata">{classroom.Batch}</div>
            </div>
            <div className="bottomline">
              <div className="topdata">
                Total Students :{" "}
                {classroom.Students ? classroom.Students.length : 0}
              </div>
              <div className="topdata">
                Total Subjects :{" "}
                {classroom.Subjects ? classroom.Subjects.length : 0}
              </div>
            </div>
          </div>
        )}
        {classroom && classroom.Subjects && classroom.Subjects.length > 0 && (
          <div className="container mt-4">
            <div className="row">
              <div className="col-md-12 Subjecthead">Subjects:</div>
              <div className="row">
                {classroom.Subjects.map((subject, index) => (
                  <div
                    className="col-md-2 subData2"
                    key={index}
                    onClick={() => handlesubjectchange(subject)}
                    {...(selectedSubject === subject
                      ? {
                          style: {
                            backgroundColor: "#26272f",
                            color: "#d6c889",
                          },
                        }
                      : {})}
                  >
                    {subject}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="container">
          <div className="row">
            <h3 className="Subjecthead mt-4">Select Date:</h3>
            <div className="col-md-1">
              <DatePicker
                selected={startDate}
                onChange={(date) => handleDateChange(date)}
                dateFormat="dd/MM/yyyy"
                className="datepicker"
                todayButton="TODAY"
              />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-5">
              <button
                type="button"
                className="btns3"
                onClick={setvisibleattendance}
              >
                {seeattendance ? "Mark Attendance " : "See Attendance"}
              </button>
            </div>
          </div>
        </div>

        {!seeattendance &&
          classroom &&
          classroom.Students &&
          classroom.Students.length > 0 && (
            <div className="container">
              <div className="row mt-4">
                <h4 className="Subjecthead">Students list:</h4>
                <div className="row">
                  <div className="col-12">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="tableheadmark">Roll No</th>
                          <th className="tableheadmark">Name</th>
                          <th className="tableheadmark">Attendance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {classroom.Students.map((student, index) => (
                          <tr key={index}>
                            <td className="tabledatamark">
                              {student.enrollNo}
                            </td>
                            <td className="tabledatamark">{student.name}</td>
                            <td className="tabledatamark">
                              <input
                                type="checkbox"
                                onChange={() => updateArrayPosition(index)}
                                className="checkboxmark"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        {!seeattendance && (
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <button type="button" className="btns3" onClick={saveData}>
                  SAVE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {seeattendance && (
        <div className="">
          <div className="container">
            <div className="row mt-4">
              <h4 className="Subjecthead">Students list:</h4>
            </div>
            <button
              type="button"
              className="btns3"
              onClick={() => {
                setSeeDetained(!seedetained);
              }}
            >
              See/Download Detained List
            </button>
          </div>
          <div className="container tablesee">
            <table>
              <thead>
                {
                  <tr className="tablerow">
                    <th className="tableheadsee">Roll No</th>
                    <th className="tableheadsee">Name</th>
                    {alldates.map((date) => (
                      <th className="tableheadsee">{date}</th>
                    ))}
                  </tr>
                }
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index} className="tablerow">
                    <td className="tabledatasee">{student.enrollNo}</td>
                    <td className="tabledatasee">{student.name}</td>
                    {console.log(student.name)}
                    {student.data.map((sub, index) => {
                      if (
                        sub.subject == selectedSubject &&
                        sub.className == classroom.className
                      ) {
                        return sub.classData.map((data, index) => {
                          return (
                            <td className="tabledatasee">
                              {data.attendance ? "P" : "A"}
                            </td>
                          );
                        });
                      }
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="container mt-4">
        <button type="button" className="btns3" onClick={logout}>
          Logout
        </button>

        {classroom && selectedSubject && seedetained && (
          <div className="row">
            <div className="container mt-4">
              <PDFViewer
                style={{ height: "80vh", width: "80vw" }}
                fileName={`DetainedList_${selectedSubject}.pdf`}
              >
                <DetainedList
                  classroom={classroom}
                  selectedSubject={selectedSubject}
                />
              </PDFViewer>
            </div>
          </div>
        )}
      </div>
      <div className="faltudiv"></div>
    </>
  );
}
