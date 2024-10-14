import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { ApiService } from '../api.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

Chart.register(...registerables);
@Component({
  selector: 'app-domain-mentor',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule], // Import RouterLink if needed
  templateUrl: './domain-mentor.component.html',
  styleUrls: ['./domain-mentor.component.css'],
})
export class DomainMentorComponent implements OnInit {
  data: any;
  percent: number = 90;
  userdata: any = {
    uid: 1,
    name: '',
    role_id: 0,
    department_id: 0,
    domain_id: 0,
  };
  name: string = '';
  chart: any;
  uid: number = 0;
  courseDataCurrent: any = [];
  courseDataOverall: any = [];
  domain_id: number = 0;
  coursedata: any;
  contentPresent: boolean = false;
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
  displayCourseData: any = { course_code: 'None', course_name: 'None' };
  recievedata: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const state = this.location.getState();
    if (typeof state === 'object' && state !== null) {
      this.userdata = state;
    }
    if (this.userdata) {
      this.apiService
        .getDomainMentorCourse({ domain_id: this.userdata.domain_id })
        .subscribe((response) => {
          if ('response' in response) {
            console.log(response.response);
          } else {
            this.coursedata = response;
            this.displayCourseData = this.coursedata[0];
            this.name = this.userdata.name;
            this.domain_id = this.userdata.domain_id;
            this.uid = this.userdata.uid;
            this.getCoordinatorProgressData();
          }
        });
    }
  }
  getCoordinatorProgressData(){
    this.apiService.getCourseProgressData({ course_code:this.displayCourseData.course_code }).subscribe((data) => {
      // Example of updating chart data with API response
      this.recievedata=data.main;
      this.courseDataCurrent = data.course_data_current;
      this.courseDataOverall = data.course_data_overall;
      console.log(this.courseDataCurrent);
      this.functionfordata();
    });
  }
  functionfordata(): void{
    if(this.chart) {
      this.chart.destroy();  // Destroy the existing chart instance
    }
    this.config.data.labels = this.recievedata.status_code;
    this.config.data.datasets[0].data = this.recievedata.count;
    this.config.data.datasets[0].backgroundColor = this.recievedata.color;

    console.log(this.config);

    this.chart = new Chart('MyChart',this.config);
  }
  navigateWithData(): void {
    this.router.navigateByUrl('/domain-mentor-table', { state: this.userdata });
  }

  navigateToOut(): void {
    this.router.navigateByUrl('/domain-mentor-login');
  }
  getCourseDataForm = this.formBuilder.group({
    course_code: '',
  });
  getCourseDetails() {
    this.apiService
      .getDomainMentorData({
        domain_id: this.userdata.domain_id,
        course_code: this.getCourseDataForm.value.course_code,
      })
      .subscribe(
        (response) => {
          this.data = response;
          this.displayCourseData = this.data[0];
          this.contentPresent = this.data.length > 0; // Show the table only if there are topics
          this.getCoordinatorProgressData();
        },
        (error) => alert('Error - try again')
      );
  }
}
