import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  topdiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E4E4E4",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  topdiv2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E4E4E4",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 5,
    borderRadius: 10,
  },
  toptxt: {
    fontSize: 20,
    fontWeight: "bold",
  },
  studentbox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 5,
  },
  stud_roll: {
    fontSize: 16,
    fontWeight: "bold",
    width: 50,
    marginRight: 20,
    marginLeft: 10,
  },
  stud_name: {
    fontSize: 16,
    fontWeight: "bold",
    width: 150,
  },
});
export default function DetainedList({ classroom, selectedSubject }) {
  const [detainedList, setDetainedList] = useState([]);
  useEffect(() => {
    const detainedList = [];
    classroom.Students.map((student) => {
      for (var i = 0; i < student.data.length; i++) {
        if (
          student.data[i].subject === selectedSubject &&
          student.data[i].className == classroom.className
        ) {
          var total = student.data[i].classData.length;
          var absent = 0;
          student.data[i].classData.map((data) => {
            if (data.attendance === false) {
              absent++;
            }
          });
          var percentage = (absent / total) * 100;
          if (percentage > 25) {
            detainedList.push(student);
          }
        }
      }
    });
    setDetainedList(detainedList);
  }, [selectedSubject]);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.topdiv}>
            <Text style={styles.toptxt}>{classroom.className}</Text>
            <Text style={styles.toptxt}>{classroom.Branch}</Text>
            <Text style={styles.toptxt}>{classroom.Batch}</Text>
          </View>
          <View style={styles.topdiv2}>
            <Text style={styles.toptxt}>{selectedSubject} Detained List: </Text>
          </View>
          <View>
            {detainedList.length > 0 ? (
              detainedList.map((student) => {
                return (
                  <View style={styles.studentbox} key={student.enrollNo}>
                    <Text style={styles.stud_roll}>{student.enrollNo}</Text>
                    <Text style={styles.stud_name}>{student.name}</Text>
                  </View>
                );
              })
            ) : (
              <Text>No student is detained</Text>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
