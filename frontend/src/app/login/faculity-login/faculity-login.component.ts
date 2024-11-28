import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../api.service';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-faculty-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './faculity-login.component.html',
  styleUrl: './faculity-login.component.css',
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ backgroundColor: 'transparent', opacity: 0 }),
        animate(1000, style({ backgroundColor: 'white', opacity: 1 }))
      ])
    ]),
    trigger('slideLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-20vw)' }),
        animate('500ms 400ms ease-in-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('500ms  ease-in-out', style({ transform: 'translateX(-20vw)' }))
      ])
    ])
  ]     
})
export class FaculityLoginComponent {
  data: User = { uid: 0, name: '', role_id: 0, department_id: 0 };
  errorMessage: string = '';
  showErrorMessage: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  checkoutForm = this.formBuilder.group({
    username: '',
    role: 1,
    password: '',
  });

  fetchFacultyData() {
    this.apiService.postLoginFacultyData(this.checkoutForm.value).subscribe(
      (data) => {
        this.data = data;
        if ('Error' in data) {
          this.showError(data.Error);
        } else if (this.data.role_id == 1) {
          this.router.navigateByUrl('/faculty-incharge', { state: this.data });
        }
      },
      (error) => {
        this.showError("An error occurred.");
      }
    );
  }

  showError(message: string) {
    this.errorMessage = message;
    this.showErrorMessage = true;

    // Auto hide the error message after 4 seconds
    setTimeout(() => {
      this.clearError();
    }, 4000);
  }

  clearError() {
    this.showErrorMessage = false;
    this.errorMessage = '';
  }
}
