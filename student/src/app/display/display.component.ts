import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  studentid: any;
  examid: any;
  marksArray: any;
  isResultLoaded = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.http.get(`http://localhost:8085/api/student/mark/${this.studentid}/${this.examid}`)
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.marksArray = resultData.data;
      });
  }

}
