import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../interfaces/user';
import { CommonModule, Location } from '@angular/common';
import {
  NgCircleProgressModule,
  CircleProgressOptions,
} from 'ng-circle-progress';
import { ApiService } from '../api.service';
type StatusCount = { status_code: number; count: number };
import { Chart ,registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [RouterLink, NgCircleProgressModule, CommonModule],
  templateUrl: './faculty.component.html',
  styleUrl: './faculty.component.css',
  providers: [
    {
      provide: CircleProgressOptions,
      useValue: {
        radius: 100,
        outerStrokeWidth: 16,
        innerStrokeWidth: 0,
        outerStrokeColor: '#78C000',
        animationDuration: 300,
        showUnits: true,
        units: '%',
        showTitle: true,
        showSubtitle: true,
        unitsColor: '#483500',
        subtitleColor: '#483500',
        titleColor: '#483500',
      },
    },
  ],
})
export class FacultyComponent implements OnInit {
  data: any;
  userData: User = { uid: 1, name: '', role_id: 0, department_id: 0 };
  percent: number = 69;
  progressValues: any = [];
  ratios: any=[];
  constructor(
    private router: Router,
    private location: Location,
    private apiService: ApiService
  ) {}

  public config:any = {
    type: 'bar',
    data: {
      labels:['upload','approve','disapprove','complete'],
      datasets:[
        {
          label:'name1',
          data:['10','2','3','6'],
          backgroundColor:'orange',
        },
        {
          label:'name2',
          data:['11','2','4','8'],
          backgroundColor:'red',
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  chart: any;


  ngOnInit(): void {
    const state = this.location.getState();
    if (typeof state === 'object' && state !== null) {
      this.userData = state as User;
    }
    this.apiService
      .getFacultyProgressData({ handler_id: this.userData.uid })
      .subscribe((data) => {
        this.progressValues = data; // Assign the received data to jsonData\
        this.ratios = this.calculateStatusCodeRatios(this.progressValues);
        console.log(this.ratios);
      }); 
      this.initChart(); // Initialize the chart
  }

  initChart():void{
    this.chart = new Chart('MyChart',this.config);
  }

  calculateStatusCodeRatios(data: { status_code: number; count: number }[]): { status_code: number; ratio: number }[] {
    const totalCount = data.reduce((sum, item) => sum + item.count, 0);
  
    return data.map(item => ({
      status_code: item.status_code,
      ratio: item.count / totalCount
    }));
  }
  
  navigateWithData(): void {
    this.router.navigateByUrl('/faculty-table', { state: this.userData });
  }
  navigateToOut(): void {
    this.router.navigateByUrl('/faculty-login');
  }
}
