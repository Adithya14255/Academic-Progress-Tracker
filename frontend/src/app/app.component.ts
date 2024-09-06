import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DomainMentorPortalTableComponent } from './domain-mentor/domain-mentor-portal-table/domain-mentor-portal-table.component';
import { LoginComponent } from './login/login.component';
import { CourseMentorPortalTableComponent } from './course-mentor/course-mentor-portal-table/course-mentor-portal-table.component';
import { FaculityLoginComponent } from './login/faculity-login/faculity-login.component';
import { FacultyTableComponent } from './faculty/faculty-table/faculty-table.component';
import { DomainMentorPortalBaseComponent } from './domain-mentor/domain-mentor-portal-base/domain-mentor-portal-base.component';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HttpClientModule,
    CommonModule,
    HeaderComponent,
    ReactiveFormsModule,
    LoginComponent,
    CourseMentorPortalTableComponent,
    DomainMentorPortalTableComponent,
    FaculityLoginComponent,
    FacultyTableComponent,
    DomainMentorPortalBaseComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ApiService]
})


export class AppComponent {
  title = 'dashboard';

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { }

}