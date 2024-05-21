import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-domain-mentor-portal',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NgxPaginationModule],
  templateUrl: './domain-mentor-portal.component.html',
  styleUrls: ['./domain-mentor-portal.component.css']
})
export class DomainMentorPortalComponent {
  constructor() {
    this.getData();
  }
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
    },
  ];

  totalCourses: number = this.array.length;
  totalHours: number = this.array.reduce((total, item) => total + item.Hours, 0);

  tabKey: any = [];
  tabValue: any = [];
  materialIndex: number = -1;
  HourIndex: number = -1
  ApproveIndex: number = -1 // Initialize to -1
  getData() {
    this.array.forEach((element: any) => {
      this.tabKey = Object.keys(element);
      this.tabValue.push(Object.values(element));
      this.materialIndex = this.tabKey.findIndex((key: string) => key === 'Material'); // Calculate material index
      this.ApproveIndex = this.tabKey.findIndex((key: string) => key === 'Approve');
      this.HourIndex = this.tabKey.findIndex((key: string) => key === 'Hours');
    });
  }
}