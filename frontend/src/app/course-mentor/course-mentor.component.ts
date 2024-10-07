import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../interfaces/user';
import { CommonModule, Location } from '@angular/common';
import { ApiService } from '../api.service';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { delay } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-course-mentor',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './course-mentor.component.html',
  styleUrl: './course-mentor.component.css',
  providers: [],
})
export class CourseMentorComponent {
  userdata: User = { uid: 1, name: '', role_id: 0, department_id: 0 };
  percent: number = 89;
  name: string = '';
  msg: string = '';
  displayCourseData: any = { course_code: '', course_name: '' };
  courseDataCurrent: any = [];
  courseDataOverall: any = [];
  recievedata: any;
  chart: any;
  public config: any = {
    type: 'pie',
    data: {
      labels: [],
      datasets: [
        {
          label: '',
          data: [],
          backgroundColor: [],
        },
      ],
    },
  };

  constructor(
    private router: Router,
    private location: Location,
    private apiService: ApiService
  ) {}
  ngOnInit(): void {
    const state = this.location.getState();
    if (typeof state === 'object' && state !== null) {
      this.userdata = state as User;
      this.name = this.userdata.name;
    }

    if(this.userdata){
    this.apiService.getCoordinatorCourse({ 'uid': this.userdata.uid })
      .subscribe((response) => {
        console.log(response);
        if ('response' in response) {
          this.msg = response.response;
          console.log(response.response);
        } else {
          this.displayCourseData = response[0];
          this.getCoordinatorProgressData();
        }
      });
  }}
  navigateWithData(): void {
    this.router.navigateByUrl('/course-mentor-table', { state: this.userdata });
  }
  navigateToOut(): void {
    this.router.navigateByUrl('/faculty-login');
  }
  getCoordinatorProgressData(){
    this.apiService.getCourseProgressData({ course_code:this.displayCourseData.course_code }).subscribe((data) => {
      // Example of updating chart data with API response
      this.recievedata=data.main;
      console.log(this.recievedata);
      this.functionfordata();
    });
  }
  functionfordata(): void{
    this.config.data.labels = this.recievedata.status_code;
    this.config.data.datasets[0].data = this.recievedata.count;
    this.config.data.datasets[0].backgroundColor = this.recievedata.color;

    console.log(this.config);

    this.chart = new Chart('MyChart',this.config);
  }
}
