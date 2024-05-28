import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hod-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './hod-dashboard.component.html',
  styleUrl: './hod-dashboard.component.css'
})
export class HodDashboardComponent {
  data: User = {id:0,name:'',role:0,password:'',department_id:0};
  constructor(private router:Router,private location:Location){}
  ngOnInit(): void {
    const state = this.location.getState();
    if (typeof state === 'object' && state !== null) {
    this.data = state as User;
}
}
}
