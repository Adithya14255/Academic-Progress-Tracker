import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-domain-mentor-portal-table',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './domain-mentor-portal-table.component.html',
  styleUrls: ['./domain-mentor-portal-table.component.css']
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
    }
  ];

  tabKey: any = [];
  tabValue: any = [];
  materialIndex: number = -1;
  HourIndex: number = -1;
  ApproveIndex: number = -1;

  getData() {
    this.array.forEach((element: any) => {
      this.tabKey = Object.keys(element);
      this.tabValue.push(Object.values(element));
      this.materialIndex = this.tabKey.findIndex((key: string) => key === 'Material');
      this.ApproveIndex = this.tabKey.findIndex((key: string) => key === 'Approve');
      this.HourIndex = this.tabKey.findIndex((key: string) => key === 'Hours');
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
}