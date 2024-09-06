import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../interfaces/user';
import { CommonModule, Location } from '@angular/common';
import { CircleProgressOptions, NgCircleProgressModule } from 'ng-circle-progress';

@Component({
  selector: 'app-course-mentor',
  standalone: true,
  imports: [RouterLink,NgCircleProgressModule,CommonModule],
  templateUrl: './course-mentor.component.html',
  styleUrl: './course-mentor.component.css',
  providers: [
    {
      provide: CircleProgressOptions,
      useValue: {
        radius: 100,
        outerStrokeWidth: 16,
        innerStrokeWidth: 0,
        outerStrokeColor: "#78C000",
        animationDuration: 300,
        showUnits: true,
        units: '%',
        showTitle: true,
        showSubtitle: true,
        unitsColor: "#483500",
        subtitleColor: "#483500",
        titleColor: "#483500",
      }
    }
  ]
})

export class CourseMentorComponent {
  data: User = {uid:0,name:'',role_id:0,department_id:0};
percent: number = 89;
  constructor(private router: Router,private location:Location){}
  ngOnInit(): void {
    const state = this.location.getState();
    if (typeof state === 'object' && state !== null) {
    this.data = state as User;
  }
}
navigateWithData(): void {
  this.router.navigateByUrl('/course-mentor-table', { state: this.data });
}
navigateToOut():void{
  this.router.navigateByUrl('/faculty-login');
}
}
