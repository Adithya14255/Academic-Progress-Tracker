import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  data: User = {id:0,name:'',role:0,department_id:0};
  constructor(private location:Location){}
  ngOnInit(): void {
    const state = this.location.getState();
    if (typeof state === 'object' && state !== null) {
    this.data = state as User;
}
}
}
