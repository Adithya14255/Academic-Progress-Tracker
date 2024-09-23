import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../interfaces/user';
import { CommonModule, Location } from '@angular/common';
import { ApiService } from '../api.service';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [RouterLink, CommonModule],
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
  charts: Chart[] = [];
    // Track references to canvas elements
    @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
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
      const otherData = JSON.parse(data.other);
      this.createCharts(otherData);
    });

    // this.createCharts(this.datafromApi);
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
    const container = this.chartContainer.nativeElement;

    Object.keys(courseData).forEach(course => {
      const chartLabels: string[] = [];
      const chartData: number[] = [];
      const chartColors: string[] = [];

      // Extract status, data, and color
      Object.keys(courseData[course]).forEach(status => {
        chartLabels.push(status);
        chartData.push(courseData[course][status][0]);
        chartColors.push(courseData[course][status][1]);

      });
      
      const courseTitle = document.createElement('h3');
      courseTitle.innerText = course; // Set the course code as the title
      container.appendChild(courseTitle); 
      // Dynamically create a canvas element
      const canvas = document.createElement('canvas');
      canvas.id = course; // Give an ID to each canvas for tracking
      container.appendChild(canvas); // Append the canvas to the container

      // Create the chart for the current course using Chart.js 3.x
      const chartConfig: ChartConfiguration = {
        type: 'pie', // You can use 'bar', 'doughnut', etc.
        data: {
          labels: chartLabels,
          datasets: [
            {
              label:'',
              data: chartData,
              backgroundColor: chartColors
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      };
      console.log(chartConfig);
      // Initialize Chart.js instance
      const chartInstance = new Chart(canvas, chartConfig);
      this.charts.push(chartInstance); // Store the chart instance for later updates if necessary
    });
  }
}
