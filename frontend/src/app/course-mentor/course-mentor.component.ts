import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../interfaces/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-mentor',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-mentor.component.html',
  styleUrl: './course-mentor.component.css'
})
export class CourseMentorComponent {
  data: User = {uid:0,name:'',role_id:0,department_id:0};
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
}
