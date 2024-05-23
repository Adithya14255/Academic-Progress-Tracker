import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomainMentorPortalBaseComponent } from './domain-mentor-portal-base/domain-mentor-portal-base.component';
import { DomainMentorPortalTableComponent } from './domain-mentor-portal-table/domain-mentor-portal-table.component';
import { HeaderComponent } from './header/header.component';
import { CourseMentorPortalTableComponent } from './course-mentor-portal-table/course-mentor-portal-table.component';

interface UserData {
  id: number;
  name: string;
  role: number;
  department_id: number | null; // Assuming department_id can be null
  hours_over: number;
  total_hours: number;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,CommonModule,DomainMentorPortalBaseComponent, DomainMentorPortalTableComponent, HeaderComponent, CourseMentorPortalTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ApiService]
})
export class AppComponent {
  title = 'dashboard';
  data: UserData[] = [];

 
  constructor(private apiService: ApiService) {}

  fetchData() {
    this.apiService.getData().subscribe(data => {
      this.data = data; // Assign the received data to jsonData
    }); // Log response for debugging
  }
}