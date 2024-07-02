import { Component,OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../interfaces/user';
import { Location } from '@angular/common';
import { NgCircleProgressModule, CircleProgressOptions } from 'ng-circle-progress';
@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [RouterLink,NgCircleProgressModule],
  templateUrl: './faculty.component.html',
  styleUrl: './faculty.component.css',
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
export class FacultyComponent implements OnInit{
  data: User = {uid:1,name:'',role_id:0,department_id:0 };
  percent: number = 69;
  constructor(private router: Router,private location:Location){}
  ngOnInit(): void {
    const state = this.location.getState();
    if (typeof state === 'object' && state !== null) {
    this.data = state as User;
  }
}
navigateWithData(): void {
  this.router.navigateByUrl('/faculty-table', { state: this.data });
}
navigateToOut():void{
  this.router.navigateByUrl('/faculty-login',{state: this.data });
}

}