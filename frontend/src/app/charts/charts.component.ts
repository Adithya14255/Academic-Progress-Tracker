import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { User } from '../interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../api.service';
import { Location } from '@angular/common';
import { Faculty_table } from '../interfaces/faculty';
Chart.register(...registerables)
@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent {
  data: Faculty_table[] = [{ uid: 0, course_code: '', course_name: '', status_code: 3, hours_completed: 10, topic: '', outcome: '' }, { uid: 0, course_code: '', course_name: '', status_code: 3, hours_completed: 20, topic: '', outcome: '' }, { uid: 0, course_code: '', course_name: '', status_code: 3, hours_completed: 5, topic: '', outcome: '' }];
  labeldata: any[] = [];
  realdata: any[] = [];
  userdata: User = { uid: 1, name: 'a', role_id: 0, department_id: 0 };
  boxcolor: string = 'white';
  constructor(private location: Location, private formBuilder: FormBuilder, private apiService: ApiService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    // const state = this.location.getState();
    // if (typeof state === 'object' && state !== null) {
    //   this.userdata = state as User;
    // } console.log(this.userdata)
    // this.apiService.getFacultyData(this.userdata.uid).subscribe(
    //   response => {
    //     this.data = response;
        if (this.data != null) {
          this.data.map(o => {
    console.log(this.realdata);
            this.labeldata.push(o.hours_completed);
            this.realdata.push(25);
          })
        }
      this.RenderChart(this.labeldata,this.realdata);
  }
  RenderChart(labeldata: any[], realdata: any[]) {
    const mycjar = new Chart('barchart', 
      { type: 'bar', 
        data: 
        { labels: ['hours completed','hours completed','hours completed'], 
          datasets: [{ 
            data: labeldata,
             backgroundColor: 'green' 
            }] }, 
            options:{}
          })
  }
}

