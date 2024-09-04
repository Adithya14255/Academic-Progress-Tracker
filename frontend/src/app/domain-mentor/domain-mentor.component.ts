import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../interfaces/user';
import { Location } from '@angular/common';
import { Chart ,registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-domain-mentor',
  standalone: true,
  imports: [RouterLink], // Import RouterLink if needed
  templateUrl: './domain-mentor.component.html',
  styleUrls: ['./domain-mentor.component.css'],
})
export class DomainMentorComponent implements OnInit {
  data: User = { uid: 1, name: '', role_id: 0, department_id: 0 };
  percent: number = 90;
//   chart!: Chart; // Use definite assignment assertion
// Chart: any;
  
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

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    const state = this.location.getState();
    if (typeof state === 'object' && state !== null) {
      this.data = state as User;
    
    }

     this.initChart(); // Initialize the chart
  }
  initChart():void{
    this.chart = new Chart('MyChart',this.config);
  }
  // initChart(): void {
  //   this.chart = new Chart({
  //     chart: {
  //       type: 'bar',
  //     },
  //     title: {
  //       text: 'Historic World Population by Region',
  //       align: 'left',
  //     },
  //     subtitle: {
  //       text: 'Source: <a href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population" target="_blank">Wikipedia.org</a>',
  //       align: 'left',
  //     },
  //     xAxis: {
  //       categories: ['Africa', 'America', 'Asia', 'Europe'],
  //       title: {
  //         text: null,
  //       },
  //       gridLineWidth: 1,
  //       lineWidth: 0,
  //     },
  //     yAxis: {
  //       min: 0,
  //       title: {
  //         text: 'Population (millions)',
  //         align: 'high',
  //       },
  //       labels: {
  //         overflow: 'justify',
  //       },
  //       gridLineWidth: 0,
  //     },
  //     tooltip: {
  //       valueSuffix: ' millions',
  //     },
  //     plotOptions: {
  //       bar: {
  //         borderRadius: 3,
  //         dataLabels: {
  //           enabled: true,
  //         },
  //         groupPadding: 0.1,
  //       },
  //     },
      
  //     credits: {
  //       enabled: false,
  //     },
  //     series: [
  //       {
  //         type: 'bar',
  //         name: 'Year 1990',
  //         data: [632, 727, 3202, 721],
  //       },
  //       {
  //         type: 'bar',
  //         name: 'Year 2000',
  //         data: [814, 841, 3714, 726],
  //       },
  //       {
  //         type: 'bar',
  //         name: 'Year 2021',
  //         data: [1393, 1031, 4695, 745],
  //       },
  //     ],
  //   });
  // }

  navigateWithData(): void {
    this.router.navigateByUrl('/domain-mentor-table', { state: this.data });
  }

  navigateToOut(): void {
    this.router.navigateByUrl('/domain-mentor-login');
  }
}
