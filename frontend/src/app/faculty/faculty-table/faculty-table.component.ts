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
      Material: "0",
      Approve: "Approve",
      Hours: 5,
      DocumentLink: "#"
    },
    {
      Course: "Unit 1",
      Title: "Python Basics",
      Outcome: "C003",
      Material: "1",
      Approve: "Approve",
      Hours: 5,
      DocumentLink: "Hm"
    },
    {
      Course: "Unit 1",
      Title: "Python Basics",
      Outcome: "C003",
      Material: "2",
      Approve: "Approve",
      Hours: 5,
      DocumentLink: "Hm"
    },
    {
      Course: "Unit 1",
      Title: "Python Basics",
      Outcome: "C003",
      Material: "3",
      Approve: "Approve",
      Hours: 5,
      DocumentLink: "Hm"
    },
    {
      Course: "Unit 1",
      Title: "Python Basics",
      Outcome: "C003",
      Material: "4",
      Approve: "Approve",
      Hours: 5,
      DocumentLink: "Hm"
    },
    {
      Course: "Unit 1",
      Title: "Python Basics",
      Outcome: "C003",
      Material: "4",
      Approve: "Approve",
      Hours: 5,
      DocumentLink: "Hm"
    },
    {
      Course: "Unit 1",
      Title: "Python Basics",
      Outcome: "C003",
      Material: "4",
      Approve: "Approve",
      Hours: 5,
      DocumentLink: "Hm"
    },
    {
      Course: "Unit 1",
      Title: "Python Basics",
      Outcome: "C003",
      Material: "4",
      Approve: "Approve",
      Hours: 5,
      DocumentLink: "Hm"
    },
    {
      Course: "Unit 1",
      Title: "Python Basics",
      Outcome: "C003",
      Material: "4",
      Approve: "Approve",
      Hours: 5,
      DocumentLink: "Hm"
    },
    {
      Course: "Unit 1",
      Title: "Python Basics",
      Outcome: "C003",
      Material: "4",
      Approve: "Approve",
      Hours: 5,
      DocumentLink: "Hm"
    }
  ];

  tabKey: any = [];
  tabValue: any = [];
  materialIndex: number = -1;
  HourIndex: number = -1;
  ApproveIndex: number = -1;
  urlIndex: number = 7; // Assuming the urlIndex is 7

  newRow: any = {
    Course: "",
    Title: "",
    Outcome: "",
    Material: "",
    Hours: 0,
    DocumentLink: ""
  };

  showForm = false;

  constructor() {
    this.getData();
  }

  getData() {
    this.array.forEach((element: any) => {
      this.tabKey = Object.keys(element);
      this.tabValue.push(Object.values(element));
      this.materialIndex = this.tabKey.findIndex((key: string) => key === 'Material');
      this.ApproveIndex = this.tabKey.findIndex((key: string) => key === 'Approve');
      this.HourIndex = this.tabKey.findIndex((key: string) => key === 'Hours');
      this.urlIndex = this.tabKey.findIndex((key: string) => key === 'DocumentLink');
    });
  }

  getColor(value: string): string {
    switch (value) {
      case '0':
        return 'white';
      case '1':
        return 'orange';
      case '2':
        return 'red';
      case '3':
        return 'lightgreen';
      default:
        return 'white'; // Default color
    }
  }

  isGreenBox(value: string): boolean {
    return this.getColor(value) === 'lightgreen';
  }

  addNewRow() {
    const newRow = {
      Course: this.newRow.Course,
      Title: this.newRow.Title,
      Outcome: this.newRow.Outcome,
      Material: this.newRow.Material,
      Approve: "Approve",
      Hours: this.newRow.Hours,
      DocumentLink: this.newRow.DocumentLink
    };

    this.array.push(newRow);
    this.tabValue.push(Object.values(newRow));

    // Reset the form
    this.newRow = {
      Course: "",
      Title: "",
      Outcome: "",
      Material: "",
      Hours: 0,
      DocumentLink: ""
    };
    this.showForm = false;
  }
}
