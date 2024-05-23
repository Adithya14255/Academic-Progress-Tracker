import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-domain-mentor-portal-base',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './domain-mentor-portal-base.component.html',
  styleUrls: ['./domain-mentor-portal-base.component.css']
})
export class DomainMentorPortalBaseComponent {
  constructor() {}
  array: any[] = [
    {
      Course: "Unit 1",
      Topic: "Python Basics",
      Outcome: "C003",
      Material: "view",
      Approve: "Approve",
      Hours: 5,
    },
    {
      Course: "Unit 1",
      Topic: "Python Basics",
      Outcome: "C003",
      Material: "view",
      Approve: "Approve",
      Hours: 5,
    },
    {
      Course: "Unit 1",
      Topic: "Python Basics",
      Outcome: "C003",
      Material: "view",
      Approve: "Approve",
      Hours: 5,
    },
    {
      Course: "Unit 1",
      Topic: "Python Basics",
      Outcome: "C003",
      Material: "view",
      Approve: "Approve",
      Hours: 5,
    },
    {
      Course: "Unit 1",
      Topic: "Python Basics",
      Outcome: "C003",
      Material: "view",
      Approve: "Approve",
      Hours: 5,
    },
    {
      Course: "Unit 1",
      Topic: "Python Basics",
      Outcome: "C003",
      Material: "view",
      Approve: "Approve",
      Hours: 5,
    },
    {
      Course: "Unit 1",
      Topic: "Python Basics",
      Outcome: "C003",
      Material: "view",
      Approve: "Approve",
      Hours: 5,
    },
    {
      Course: "Unit 1",
      Topic: "Python Basics",
      Outcome: "C003",
      Material: "view",
      Approve: "Approve",
      Hours: 5,
    },
    {
      Course: "Unit 1",
      Topic: "Python Basics",
      Outcome: "C003",
      Material: "view",
      Approve: "Approve",
      Hours: 5,
    },
    {
      Course: "Unit 1",
      Topic: "Python Basics",
      Outcome: "C003",
      Material: "view",
      Approve: "Approve",
      Hours: 5,
    },
    {
      Course: "Unit 1",
      Topic: "Python Basics",
      Outcome: "C003",
      Material: "view",
      Approve: "Approve",
      Hours: 5,
    },
    {
      Course: "Unit 1",
      Topic: "Python Basics",
      Outcome: "C003",
      Material: "view",
      Approve: "Approve",
      Hours: 5,
    }
  ];

  totalCourses: number = this.array.length;
  totalHours: number = this.array.reduce((total, item) => total + item.Hours, 0);
}