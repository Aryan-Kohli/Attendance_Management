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
  topdiv3: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
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
  toptxt2: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
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
export default function AllList({ classroom, students }) {
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
            <Text style={styles.toptxt}>
              Total Students : {classroom.Students.length}
            </Text>
            <Text style={styles.toptxt}>
              Total Subjects : {classroom.Subjects.length}
            </Text>
          </View>
          <View style={styles.topdiv3}>
            <Text style={styles.toptxt2}>Subjects List:</Text>
            {classroom.Subjects.length > 0 &&
              classroom.Subjects.map((subject) => {
                return (
                  <Text style={styles.subject} key={subject}>
                    {subject}
                  </Text>
                );
              })}
          </View>
          <View>
            <Text style={styles.toptxt2}>Students List:</Text>

            {students.length > 0 ? (
              students.map((student, index) => {
                return (
                  <View style={styles.studentbox} key={student.enrollNo}>
                    <Text style={styles.stud_roll}>{index}</Text>
                    <Text style={styles.stud_roll}>{student.enrollNo}</Text>
                    <Text style={styles.stud_name}>{student.name}</Text>
                  </View>
                );
              })
            ) : (
              <Text>No student is found</Text>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
