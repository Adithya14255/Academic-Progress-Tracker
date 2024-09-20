import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../interfaces/user';
import { CommonModule, Location } from '@angular/common';
import { ApiService } from '../api.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css'],
})
export class FacultyComponent implements OnInit, AfterViewInit {
  @ViewChild('myChart') myChart!: ElementRef;

  data: User = { uid: 1, name: '', role_id: 0, department_id: 0 };
  percent: number = 69;
  chart: any;
  ratios: any = [];

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
    }
  }

  ngAfterViewInit(): void {
    this.apiService.getFacultyProgressData({ handler_id: this.data.uid }).subscribe((data) => {
      // Example of updating chart data with API response
      this.config.data.labels = data.status_code;
      this.config.data.datasets[0].data = data.count;
      this.config.data.datasets[0].backgroundColor = data.color;

      console.log(this.config);

      // Initialize the chart after the view has been initialized
      this.chart = new Chart(this.myChart.nativeElement, this.config);
    });
  }

  navigateWithData(): void {
    this.router.navigateByUrl('/faculty-table', { state: this.data });
  }

  navigateToOut(): void {
    this.router.navigateByUrl('/faculty-login');
  }
}
