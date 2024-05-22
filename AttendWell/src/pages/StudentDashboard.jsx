import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/StudentDashboard.css";
import Cookies from "js-cookie";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie, Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register the plugins
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [allchartdata, setAllchartdata] = useState([]);
  const [allchartoptions, setAllChartoptions] = useState([]);
  // const data = {
  //   labels: ["Present", "Absent"],
  //   datasets: [
  //     {
  //       label: "Your attendance",
  //       data: [45, 12],
  //       backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
  //       borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const options = {
  //   plugins: {
  //     tooltip: {
  //       callbacks: {
  //         label: function (context) {
  //           let label =
  //             context.label == "Present" ? "Attended" : "Not Attended ";
  //           let value = context.raw;
  //           let sum = context.dataset.data.reduce((a, b) => a + b, 0);
  //           let percentage = ((value / sum) * 100).toFixed(2) + "%";
  //           return `${label}: ${context.raw}`;
  //         },
  //       },
  //     },
  //     datalabels: {
  //       formatter: (value, context) => {
  //         let sum = 0;
  //         let dataArr = context.chart.data.datasets[0].data;
  //         dataArr.forEach((data) => {
  //           sum += data;
  //         });
  //         let percentage = ((value * 100) / sum).toFixed(2) + "%";
  //         return percentage;
  //       },
  //       color: "black",
  //     },
  //     title: {
  //       display: true,
  //       text: "Custom Chart Title",
  //     },
  //   },
  // };
  useEffect(() => {
    function setdata() {
      if (!studentData || studentData.data == null || studentData.data == []) {
        return;
      }
      const data = [];
      const options = [];
      for (var i = 0; i < studentData.data.length; i++) {
        var p = 0,
          a = 0;
        for (var j = 0; j < studentData.data[i].classData.length; j++) {
          if (studentData.data[i].classData[j].attendance === true) {
            p++;
          } else {
            a++;
          }
        }
        data.push({
          labels: ["Present", "Absent"],
          datasets: [
            {
              label: "Your attendance",
              data: [p, a],
              backgroundColor: ["#2d8032", "#ad332f"],
              borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
          ],
        });
        options.push({
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label =
                    context.label == "Present" ? "Attended" : "Not Attended ";
                  let value = context.raw;
                  let sum = context.dataset.data.reduce((a, b) => a + b, 0);
                  let percentage = ((value / sum) * 100).toFixed(2) + "%";
                  return `${label}: ${context.raw}`;
                },
              },
            },
            datalabels: {
              formatter: (value, context) => {
                let sum = 0;
                let dataArr = context.chart.data.datasets[0].data;
                dataArr.forEach((data) => {
                  sum += data;
                });
                let percentage = ((value * 100) / sum).toFixed(2) + "%";
                if (percentage === "0.00%") return "";
                return percentage;
              },
              color: "#ffffff",
              fontWeight: "600",
            },
            title: {
              display: true,
              text: "Custom Chart Title",
            },
          },
        });
      }
      setAllchartdata(data);
      setAllChartoptions(options);
    }
    setdata();
  }, [studentData]);
  useEffect(() => {
    const tt = Cookies.get("student");
    if (!tt) navigate("/student/login");
    const token = JSON.parse(tt);
    if (token) {
      setToken(token);
    } else navigate("/student/login");
  }, [navigate]);

  useEffect(() => {
    async function getDataStudent() {
      if (token === "") return;
      try {
        const response = await axios.post("/student/getStudent", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setStudentData(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    getDataStudent();
  }, [token]);

  async function logout() {
    Cookies.remove("student");
    navigate("/student/login");
  }
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Turn off loading spinner after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);
  return (
    <div className="container-fluid">
      <div className="row adminclasstop">
        <div className="topline">
          <div className="topdata">
            <h2>{studentData ? `HI, ${studentData.name}` : ""}</h2>
          </div>
          <div className="topdata">
            <h2>
              {studentData ? `Enroll No. :  ${studentData.enrollNo}` : ""}
            </h2>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <div className="row">
          {studentData &&
            studentData.data &&
            allchartdata.length > 0 &&
            studentData.data.map((item, index) => {
              return (
                <div className="col-md-3 offset-md-1">
                  {loading ? (
                    <div
                      className="spinner-border text-primary mt-4"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <>
                      <h4 className="charthead">
                        {item.className} : {item.subject}
                      </h4>
                      <Doughnut
                        data={allchartdata[index]}
                        options={allchartoptions[index]}
                      />
                      <h6 className="attendSuggest mt-3">
                        {allchartdata[index].datasets[0].data[0] /
                          (allchartdata[index].datasets[0].data[0] +
                            allchartdata[index].datasets[0].data[1]) <
                        0.75
                          ? `Attend atleast ${Math.ceil(
                              (0.75 *
                                (allchartdata[index].datasets[0].data[0] +
                                  allchartdata[index].datasets[0].data[1]) -
                                allchartdata[index].datasets[0].data[0]) /
                                0.25
                            )} classes continously to catch up .`
                          : `WHOO HOO! You are doing great in attendance attend in ${item.subject}`}
                      </h6>
                    </>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <div className="container">
        <button
          onClick={logout}
          type="button"
          className="btn btn-outline-danger mybtn2"
        >
          Logout
        </button>
      </div>
      <div className="faltudiv"></div>

      {/* <div className="row">{studentData.data.length}</div> */}
    </div>
  );
}
