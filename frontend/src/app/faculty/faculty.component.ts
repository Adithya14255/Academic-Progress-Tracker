import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../interfaces/user';
import { CommonModule, Location } from '@angular/common';
import { ApiService } from '../api.service';
import { Chart } from 'chart.js';
import { NgChartsModule } from 'ng2-charts'; 

@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [RouterLink, CommonModule,NgChartsModule],
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css'],
})
export class FacultyComponent implements OnInit {

  data: User = { uid: 1, name: '', role_id: 0, department_id: 0 };
  percent: number = 69;
  chart: any;
  ratios: any = [];
  recievedata: any;
  chartsData: Array<any> = [];
  datafromApi:any;

  constructor(
    private router: Router,
    private location: Location,
    private apiService: ApiService
  ) {}

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

  ngOnInit(): void {
    const state = this.location.getState();
    if (typeof state === 'object' && state !== null) {
      this.data = state as User;
    
    this.apiService.getFacultyProgressData({ handler_id: this.data.uid }).subscribe((data) => {
      // Example of updating chart data with API response
      this.recievedata=data.main;
      console.log(this.recievedata);
      this.functionfordata();
      this.createCharts(data.other);
    });

    this.createCharts(this.datafromApi);
  }}
  functionfordata(): void{
    this.config.data.labels = this.recievedata.status_code;
    this.config.data.datasets[0].data = this.recievedata.count;
    this.config.data.datasets[0].backgroundColor = this.recievedata.color;

    console.log(this.config);

    this.chart = new Chart('MyChart',this.config);
  }
  navigateWithData(): void {
    this.router.navigateByUrl('/faculty-table', { state: this.data });
  }

  navigateToOut(): void {
    this.router.navigateByUrl('/faculty-login');
  }

  createCharts(courseData: any) {
    Object.keys(courseData).forEach(course => {
      const chartLabels: string[] = [];
      const chartData: number[] = [];
      const chartColors: string[] = [];

      // Extract data for each status in a course
      Object.keys(courseData[course]).forEach(status => {
        chartLabels.push(status); // Push status like 'Not uploaded', 'Uploaded'
        chartData.push(courseData[course][status][0]); // Push the count, like 6, 4, 1, etc.
        chartColors.push(courseData[course][status][1]); // Push the color
      });

      // Create the chart configuration
      const chartConfig = {
        labels: chartLabels,
        datasets: [
          {
            data: chartData, // Count values
            backgroundColor: chartColors, // Status colors
            label: course // Course label
          }
        ],
        chartType: 'pie' // Or 'bar', 'doughnut', etc.
      };

      // Add this configuration to the chartsData array
      this.chartsData.push(chartConfig);
    });
  }
}
