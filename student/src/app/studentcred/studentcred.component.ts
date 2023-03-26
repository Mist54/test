import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-studentcred',
  templateUrl: './studentcred.component.html',
  styleUrls: ['./studentcred.component.css']
})
export class StudentcredComponent {
  StudentArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  stname: string = "";
  course: string = "";
  fee: string = "";
  currentStudentID = "";

  constructor(private http: HttpClient, private router: Router) { this.getAllStudent(); }
  

  ngOnInit(): void {
  }
  getAllStudent() {
    this.http.get("http://localhost:8085/api/student/")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.StudentArray = resultData.data;
      });
  }

  register() {
    let bodyData = {
      "stname": this.stname,
      "course": this.course,
      "fee": this.fee,
    };
    this.http.post("http://localhost:8085/api/student/add", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Student Registered Successfully")
      this.getAllStudent();
    });
  }
  setUpdate(data: any) {
    this.stname = data.stname;
    this.course = data.course;
    this.fee = data.fee;
    this.currentStudentID = data.id;
  }
  UpdateRecords() {
    let bodyData =
    {
      "stname": this.stname,
      "course": this.course,
      "fee": this.fee
    };

    this.http.put("http://localhost:8085/api/student/update" + "/" + this.currentStudentID, bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Student record is updated")
      this.getAllStudent();

    });
  }
  save() {
    if (this.currentStudentID == '') {
      this.register();
    }
    else {
      this.UpdateRecords();
    }

  }


  setDelete(data: any) {
    this.http.delete("http://localhost:8085/api/student/delete" + "/" + data.id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Student Deleted")
      this.getAllStudent();
    });
  }
  
}

