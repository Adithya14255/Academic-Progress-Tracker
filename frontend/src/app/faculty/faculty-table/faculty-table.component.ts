import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faculty-table',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './faculty-table.component.html',
  styleUrls: ['./faculty-table.component.css']
})

export class FacultyTableComponent {
  array: any[] = [
    {
      Course: "Unit 1",
      Title: "Python Basics",
      Outcome: "C003",
      Status: 3,
      Hourstaken:0,
    }
  ];

  tabKey: any = [];
  tabValue: any = [];
  statusIndex: any = [];
  checkval: number = 0;
  constructor() {
    this.Data();
  }

  Data() {
    this.array.forEach((element: any) => {
      this.tabKey = Object.keys(element);
      this.tabValue.push(Object.values(element));
    });
  }
}