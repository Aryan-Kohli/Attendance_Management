import React, { useState, useEffect } from "react";
import "../css/AdminMainPage.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export default function AdminMainPage() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [totalstudents, setTotalStudents] = useState(0);
  const [classrooms, setClassrooms] = useState([]);
  const [formvisible, setFormVisible] = useState(false);

  const [newclassname, setNewClassName] = useState("");
  const [newbranch, setNewBranch] = useState("");
  const [newbatch, setNewBatch] = useState("");
  const [newclasspass, setNewClassPass] = useState("");

  const [selectedClassroom, setSelectedClassroom] = useState(null);
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
    function studentsCount() {
      if (admin === null) return;
      let count = 0;
      for (var i = 0; i < admin.classrooms.length; i++) {
        count += admin.classrooms[i].Students.length;
      }
      setTotalStudents(count);
    }
    function classroomSet() {
      if (admin === null) return;
      setClassrooms(admin.classrooms);
    }
    studentsCount();
    classroomSet();
  }, [admin]);
  function logout() {
    Cookies.remove("adminjwt");
    Cookies.remove("selectedClassroom");
    navigate("/admin/login");
  }

  async function addClassroom() {
    if (newclassname === "") {
      alert("Please enter the classname");
      return;
    }
    if (newbranch === "") {
      alert("Please enter the branch");
      return;
    }
    if (newbatch === "") {
      alert("Please enter the batch");
      return;
    }
    if (newclasspass === "") {
      alert("Please enter the class password");
      return;
    }
    const newclassroom = {
      className: newclassname,
      password: newclasspass,
      Branch: newbranch,
      TotalStudents: 0,
      Batch: newbatch,
      Subjects: [],
      Students: [],
    };
    try {
      const response = await axios.post(
        "/classroom/createClassroom",
        newclassroom
      );
      const newClass = response.data;
      // setClassrooms([...classrooms, newClass]);
      const allclassids = admin.classrooms;
      const response2 = await axios.put(`/teacher/updateTeacher/${admin._id}`, {
        classrooms: [...allclassids, newClass._id],
      });

      console.log(response2.data);
      setFormVisible(false);
      console.log(response.data);
      // Window.location.reload();

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
    } catch (e) {
      console.log(e.response.status);
      if (e.response.status === 409) {
        alert("Enter a unique classname and classpass");
      }
      if (e.response.status === 500) {
        alert("Server Error");
      }
    }
  }
  async function editClassroom(classData) {
    Cookies.set("selectedClassroom", JSON.stringify(classData));
    navigate("/admin/editclassroom");
  }
  return (
    <div className="tt">
      <div className="container mt-4">
        <div>
          {admin === null ? (
            <div className="spinner-border text-primary mt-4" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <div className="adminTopsec">
              <h2>Welcome, {admin.username}</h2>
              <h4>{admin.orgname}</h4>
              <div className="row">
                <div className="col-md-3  topBoxAdmin ">
                  Total Students: {totalstudents}
                </div>
                <div className="col-md-3 topBoxAdmin">
                  Total Classrooms :{" "}
                  {admin.classrooms ? admin.classrooms.length : 0}
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="row mt-4">
            <div className="col-md-4">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => setFormVisible(!formvisible)}
              >
                Add Classroom
              </button>
            </div>
            <div className="form">
              {formvisible && (
                <div>
                  <div className="row mt-4">
                    <div className="col-md-4">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control registerboxinp"
                          id="floatingClassName"
                          placeholder="ClassName"
                          onChange={(e) => setNewClassName(e.target.value)}
                        />
                        <label className="labeltxt" htmlFor="floatingClassName">
                          ClassName
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control registerboxinp"
                          id="floatingClassPass"
                          placeholder="ClassPass"
                          onChange={(e) => setNewClassPass(e.target.value)}
                        />
                        <label className="labeltxt" htmlFor="floatingClassPass">
                          Class password
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control registerboxinp"
                          id="floatingBranch"
                          placeholder="Branch"
                          onChange={(e) => setNewBranch(e.target.value)}
                        />
                        <label className="labeltxt" htmlFor="floatingBranch">
                          Branch
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control registerboxinp"
                          id="floatingBatch"
                          placeholder="Batch"
                          onChange={(e) => setNewBatch(e.target.value)}
                        />
                        <label className="labeltxt" htmlFor="floatingBatch">
                          Batch
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <button
                        type="button"
                        className="addbtn"
                        onClick={addClassroom}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {classrooms.length > 0 && (
          <div className="row classBoxDiv mt-4">
            {classrooms.map((classroom, index) => (
              <div className="col-md-5 classBox" key={classroom._id}>
                <div className="row">
                  <div className="col-md-6">
                    <h4>{classroom.className}</h4>
                  </div>
                  <div className="col-md-6">
                    <h4>{classroom.Branch}</h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h4>{classroom.Batch}</h4>
                  </div>
                  <div className="col-md-6">
                    <h4>{classroom.Students.length} Students</h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <button
                      type="button"
                      className="Ediclassbtn"
                      onClick={() => editClassroom(classroom)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="logoutbtndiv">
          <button
            type="button"
            className="btn btn-outline-danger mybtn2"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="faltudiv"></div>
    </div>
  );
}
