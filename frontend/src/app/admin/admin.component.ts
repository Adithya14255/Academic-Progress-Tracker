import { Component } from '@angular/core';
import { User } from '../interfaces/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  data: User = {uid:0,name:'',role_id:0,department_id:0};
  constructor(private location:Location){}
  ngOnInit(): void {
    const state = this.location.getState();
    if (typeof state === 'object' && state !== null) {
    this.data = state as User;
}
}
}
