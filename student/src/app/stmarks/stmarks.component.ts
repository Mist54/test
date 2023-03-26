import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stmarks',
  templateUrl: './stmarks.component.html',
  styleUrls: ['./stmarks.component.css']
})
export class StmarksComponent implements OnInit {
  MarksArray: any[] = [];
  examid: string = "";
  examname: string = "";
  studentid: string = "";
  sub1: string = "";
  sub2: string = "";
  sub3: string = "";
  sub4: string = "";
  sub5: string = "";
  sub6: string = "";
  total: string = "";
  grade: string = "";
  Result: string = "";
  currentMarkID = "";
 

  constructor(private http: HttpClient, private router: Router) { this.getAllMarks(); }

  ngOnInit() {}
  // Shows all Marks Records
  getAllMarks() {
    this.http.get("http://localhost:8085/api/marks")
      .subscribe((resultData: any) => {
        console.log(resultData.data);
        this.MarksArray = resultData.data;
      });
  }

  save() {
    if (this.currentMarkID == "") {
      this.register();
    }
    else {
      this.UpdateRecords();
    }
  }

  //Saving the new marks record
  register() {
    let bodyData = {
      "examid":this.examid,
      "examname":this.examname,
      "studentid":this.studentid,
      "sub1":this.sub1,
      "sub2":this.sub2,
      "sub3":this.sub3,
      "sub4":this.sub4,
      "sub5":this.sub5,
      "sub6":this.sub6,
      "total":this.total,
      "grade":this.grade,
      "Result":this.Result
      
    };
    this.http.post("http://localhost:8085/api/marks/add", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Student Registered Successfully")
      this.getAllMarks();
    });
  }
  //update marks record 
  setUpdate(data: any) {
    
    //update code goes here 
    this.currentMarkID = data.id;
    this.examid = data.examid;
    this.examname=data.examname;
    this.studentid = data.studentid;
    this.sub1 = data.sub1;
    this.sub2 = data.sub2;
    this.sub3 = data.sub3;
    this.sub4 = data.sub4;
    this.sub5 = data.sub5;
    this.sub6 = data.sub6;
    this.total = data.total;
    this.grade=data.grade;
    this.Result = data.Result;
   }
   UpdateRecords() {
    let bodyData =
    {
      "examid": this.examid,
      "examname": this.examname,
      "studentid": this.studentid,
      "sub1": this.sub1,
      "sub2": this.sub2,
      "sub3": this.sub3,
      "sub4": this.sub4,
      "sub5": this.sub5,
      "sub6": this.sub6,
      "total": this.total,
      "grade":this.grade,
      "Result": this.Result,

    };
    this.http.put("http://localhost:8085/api/student/marks/update/" + this.currentMarkID, bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Student record is Updated")
      this.getAllMarks();
    });
  }


  
  //Deleteing the mark records 
  setDelete(data: any) {
    this.http.delete(`http://localhost:8085/api/student/marks/delete/${data.id}`).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Marks Info is Deleted");
      this.getAllMarks();
    });
  }
}




