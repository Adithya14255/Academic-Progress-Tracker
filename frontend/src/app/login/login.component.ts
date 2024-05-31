import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FaculityLoginComponent } from './faculity-login/faculity-login.component';
import { DomainMentorLoginComponent } from './domain-mentor-login/domain-mentor-login.component';
import { CourseMentorLoginComponent } from './course-mentor-login/course-mentor-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,HeaderComponent,FaculityLoginComponent,DomainMentorLoginComponent,CourseMentorLoginComponent,AdminLoginComponent,RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) {
    this.router.navigateByUrl('/faculty-login');
  }
        
  
}
