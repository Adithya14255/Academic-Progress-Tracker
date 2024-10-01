import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../interfaces/user';
import { CommonModule, Location } from '@angular/common';


@Component({
  selector: 'app-course-mentor',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './course-mentor.component.html',
  styleUrl: './course-mentor.component.css',
  providers: []
})

export class CourseMentorComponent {
  data: User = {uid:0,name:'',role_id:0,department_id:0};
percent: number = 89;
name: string = '';
  constructor(private router: Router,private location:Location){}
  ngOnInit(): void {
    const state = this.location.getState();
    if (typeof state === 'object' && state !== null) {
    this.data = state as User;
  }
  this.name=this.data.name;

}
navigateWithData(): void {
  this.router.navigateByUrl('/course-mentor-table', { state: this.data });
}
navigateToOut():void{
  this.router.navigateByUrl('/faculty-login');
}
}
