import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomainMentorPortalComponent } from './domain-mentor-portal/domain-mentor-portal.component';
import { LoginComponent } from './login/login.component';


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
  imports: [RouterOutlet,HttpClientModule,CommonModule,DomainMentorPortalComponent,LoginComponent],
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

