import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-base-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './admin-base-dashboard.component.html',
  styleUrl: './admin-base-dashboard.component.css'
})
export class AdminBaseDashboardComponent {
  constructor() {}
  array: any[] = [
    {
      Dep: "AIDS",
      Course: 5,
    },
    {
      Dep: "AIDS",
      Course: 5,
    },
    {
      Dep: "AIDS",
      Course: 5,
    },
    {
      Dep: "AIDS",
      Course: 5,
    }
  ];

  totalDep: number = this.array.length;
  totalCourse: number = this.array.reduce((total, item) => total + item.Course, 0);
}
