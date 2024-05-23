import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FaculityLoginComponent } from '../faculity-login/faculity-login.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent,FaculityLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
}
