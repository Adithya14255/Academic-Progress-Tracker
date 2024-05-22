import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-domain-mentor-portal-table',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './domain-mentor-portal-table.component.html',
  styleUrl: './domain-mentor-portal-table.component.css'
})
export class DomainMentorPortalTableComponent {
  constructor() {
    this.getData();
  }  

  array: any[] = [
    {
      Course: "Unit 1",
      Title: "Python Basics",
      Outcome: "C003",
      Material: "view",
      Approve: "Approve",
      Hours: 5,
    },
    {
      Course: "Unit 1",
      Title: "Python Basics",
      Outcome: "C003",
      Material: "view",
      Approve: "Approve",
      Hours: 5,
    },
    {
      Course: "Unit 1",
      Title: "Python Basics",
      Outcome: "C003",
      Material: "view",
      Approve: "Approve",
      Hours: 5,
    },
    {
      Course: "Unit 1",
      Title: "Python Basics",
      Outcome: "C003",
      Material: "view",
      Approve: "Approve",
      Hours: 5,
    },
    {
      Course: "Unit 1",
      Title: "Python Basics",
      Outcome: "C003",
      Material: "view",
      Approve: "Approve",
      Hours: 5,
    },
    {
      Course: "Unit 1",
      Title: "Python Basics",
      Outcome: "C003",
      Material: "view",
      Approve: "Approve",
      Hours: 5,
    },
    {
      Course: "Unit 1",
      Title: "Python Basics",
      Outcome: "C003",
      Material: "view",
      Approve: "Approve",
      Hours: 5,
    },
    {
      Course: "Unit 1",
      Title: "Python Basics",
      Outcome: "C003",
      Material: "view",
      Approve: "Approve",
      Hours: 5,
    },
    {
      Course: "Unit 1",
      Title: "Python Basics",
      Outcome: "C003",
      Material: "view",
      Approve: "Approve",
      Hours: 5,
    },
    {
      Course: "Unit 1",
      Title: "Python Basics",
      Outcome: "C003",
      Material: "view",
      Approve: "Approve",
      Hours: 5,
    },
    {
      Course: "Unit 1",
      Title: "Python Basics",
      Outcome: "C003",
      Material: "view",
      Approve: "Approve",
      Hours: 5,
    }
  ]

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