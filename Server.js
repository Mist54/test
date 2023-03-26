const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql");
const server = express();
server.use(bodyParser.json());
const cors= require('cors');
server.use(cors());
 
//Establish the database connection
 
const db = mysql.createConnection({
 
    host: "localhost",
    user: "root",
    password: "",
    database: "marks",
 
});
 
db.connect(function (error) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      console.log("successfully Connected to DB");
    }
  });
 
//Establish the Port
 
server.listen(8085,function check(error) {
    if (error)
    {
    console.log("Error..!!");
    }
 
    else
    {
        console.log("Started....!!!! 8085");
 
    }
});

//Create the Records
 
server.post("/api/student/add", (req, res) => {
    let details = {
      stname: req.body.stname,
      course: req.body.course,
      fee: req.body.fee,
    };
    let sql = "INSERT INTO student SET ?";
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: "Student created Failed" });
      } else {
        res.send({ status: true, message: "Student created successfully" });
      }
    });
  });
  
//view the Records
 
server.get("/api/student", (req, res) => {
    var sql = "SELECT * FROM student";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });

//Search the Records
 
server.get("/api/student/:id", (req, res) => {
  var studentid = req.params.id;
  var sql = "SELECT * FROM student WHERE id=" + studentid;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Update Records 

server.put("/api/student/update/:id", (req, res) => {
  let sql =
    "UPDATE student SET stname='" +
    req.body.stname +
    "', course='" +
    req.body.course +
    "',fee='" +
    req.body.fee +
    "'  WHERE id=" +
    req.params.id;

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Student Updated Failed" });
    } else {
      res.send({ status: true, message: "Student Updated successfully" });
    }
  });
});

 //Delete the Records
 
 server.delete("/api/student/delete/:id", (req, res) => {
  let sql = "DELETE FROM student WHERE id=" + req.params.id + "";
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Student Deleted Failed" });
    } else {
      res.send({ status: true, message: "Student Deleted successfully" });
    }
  });
});

//Create the marks Records
 
server.post("/api/marks/add", (req, res) => {
  let details = {
    examid: req.body.examid,
    examname: req.body.examname,
    studentid: req.body.studentid,
    sub1: req.body.sub1,
    sub2: req.body.sub2,
    sub3: req.body.sub3,
    sub4: req.body.sub4,
    sub5: req.body.sub5,
    sub6: req.body.sub6,
    total: req.body.total,
    grade: req.body.grade,
    result:req.body.Result,
  };
  let sql = "INSERT INTO marks SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Student marks insertion Failed",error });
    } else {
      res.send({ status: true, message: "Student marks inserted successfully" });
    }
  });
});

//View All Marks records

server.get("/api/marks", (req, res) => {
  var sql = "SELECT * FROM marks";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Searching marks records

server.get("/api/student/mark/:id/:examid", (req, res) => {
  var studentid = req.params.id;
  var examid  = req.params.examid;
  var sql = "SELECT * FROM marks WHERE studentid=" + studentid + " AND examid='" + examid + "'"; 
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Update marks Records 

server.put("/api/student/marks/update/:id", (req, res) => {
  let sql =
    "UPDATE marks SET examid='" +req.body.examid +"', examname='" +req.body.examname + "',studentid='"+ req.body.studentid +
    "',sub1='"+ req.body.sub1 +
    "',sub2='"+ req.body.sub2 +
    "',sub3='"+ req.body.sub3 +
    "',sub4='"+ req.body.sub4 +
    "',sub5='"+ req.body.sub5 +
    "',sub6='"+ req.body.sub6 +
    "'  WHERE id=" +
    req.params.id;

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Student marks Updated Failed" });
    } else {
      res.send({ status: true, message: "Student marks Updated successfully" });
    }
  });
});

//Deleting Marks Record 
server.delete("/api/student/marks/delete/:id", (req, res) => {
  let sql = "DELETE FROM marks WHERE id=" + req.params.id + "";
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: " Deletion  Failed" });
    } else {
      res.send({ status: true, message: "Deleted successfully" });
    }
  });
});

