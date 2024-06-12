import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../interfaces/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './faculty.component.html',
  styleUrl: './faculty.component.css'
})
export class FacultyComponent {
  data: User = {uid:1,name:'',role_id:0,department_id:0 };
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
}
