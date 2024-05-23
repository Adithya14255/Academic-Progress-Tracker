import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'app-course-mentor-portal-table',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule to imports
  templateUrl: './course-mentor-portal-table.component.html',
  styleUrls: ['./course-mentor-portal-table.component.css']
})
export class CourseMentorPortalTableComponent {
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
    // Add other data objects here
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
      this.urlIndex = this.tabKey.findIndex((key: string) => key  === 'DocumentLink');
    });
  }

  onSelectChange(event: Event, rowIndex: number) {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement.value === 'disapprove') {
      const reason = prompt('Please enter the reason for disapproval:');
      if (reason) {
        console.log(`Disapproval reason for row ${rowIndex}:`, reason);
        // Optionally store the reason in the array or take other actions
      } else {
        // If no reason provided, set the select value back to "approve"
        selectElement.value = 'approve';
      }
    }
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