import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../interfaces/user';
import { CommonModule, Location } from '@angular/common';
import { Chart ,registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-domain-mentor',
  standalone: true,
  imports: [RouterLink,CommonModule], // Import RouterLink if needed
  templateUrl: './domain-mentor.component.html',
  styleUrls: ['./domain-mentor.component.css'],
})
export class DomainMentorComponent implements OnInit {
  data: any;
  percent: number = 90;
  public config:any = {
  type: 'pie',
  data: {
    labels:['upload','approve','disapprove','complete'],
    datasets:[
      {
        label:'name1',
        data:['10','2','3','6'],
        backgroundColor:['orange','green','blue','red']
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

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    const state = this.location.getState();
    if (typeof state === 'object' && state !== null) {
      this.data = state;
    
    }

     this.initChart(); // Initialize the chart
  }
  initChart():void{
    this.chart = new Chart('MyChart',this.config);
  }

  navigateWithData(): void {
    this.router.navigateByUrl('/domain-mentor-table', { state: this.data });
  }

  navigateToOut(): void {
    this.router.navigateByUrl('/domain-mentor-login');
  }
}
