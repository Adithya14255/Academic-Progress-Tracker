import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../interfaces/user';
import { CommonModule, Location } from '@angular/common';
import { ApiService } from '../api.service';
import { Chart ,registerables } from 'chart.js';
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

  ratios: any=[];
  constructor(
    private router: Router,
    private location: Location,
    private apiService: ApiService
  ) {}
  

  public config: any = {
    type: 'pie',
    data: {
      labels: ['overall','approve','disapprove'],
      datasets: [
        {
          label:'OverAll',
          data: ['20','2','23'],
          backgroundColor: ['#D0FA58','#0174DF','#FE2E2E'],
        },
      ],
    },
  };


  chart: any;


  ngOnInit(): void {
    const state = this.location.getState();
    if (typeof state === 'object' && state !== null) {
      this.data = state as User;
    }
    this.apiService
      .getFacultyProgressData({ handler_id: this.data.uid })
      .subscribe((data) => {
        
        this.config.data.labels = data.status_code;
        this.config.data.datasets[0].data = data.count;
        this.config.data.datasets[0].backgroundColor = data.color;
        console.log(this.config);
        this.chart = new Chart('MyChart',this.config);
  }); 
  }

  
  navigateWithData(): void {
    this.router.navigateByUrl('/faculty-table', { state: this.data });
  }
  navigateToOut(): void {
    this.router.navigateByUrl('/faculty-login');
  }
}
