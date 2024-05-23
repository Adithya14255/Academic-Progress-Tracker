import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomainMentorPortalBaseComponent } from './domain-mentor-portal-base/domain-mentor-portal-base.component';
import { DomainMentorPortalTableComponent } from './domain-mentor-portal-table/domain-mentor-portal-table.component';
import { HeaderComponent } from './header/header.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { User } from './interfaces/user';
import { LoginComponent } from './login/login.component';
import { CourseMentorPortalTableComponent } from './course-mentor-portal-table/course-mentor-portal-table.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HttpClientModule,
    CommonModule,
    DomainMentorPortalBaseComponent,
    DomainMentorPortalTableComponent,
    HeaderComponent,
    ReactiveFormsModule,
    LoginComponent,
    CourseMentorPortalTableComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ApiService]
})


export class AppComponent {
  title = 'dashboard';
  data: User = { id: 0, name: '', role: 0, password: '', department_id: 0 };
  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { }
  checkoutForm = this.formBuilder.group({
    name: '',
    role: 2,
    password: ''
  });



  fetchCourseMentorData() {
    this.apiService.postLoginCourseMentorData(this.checkoutForm.value).subscribe(data => {
      this.data = data; // Assign the received data to jsonData
    }); // Log response for debugging
  }
}