import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-faculity-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './faculity-login.component.html',
  styleUrl: './faculity-login.component.css'
})
export class FaculityLoginComponent {
  data: User = {id:0,name:'',role:0,password:'',department_id:0};
  constructor(private router: Router,private formBuilder: FormBuilder,private apiService: ApiService) {}
  checkoutForm = this.formBuilder.group({
    name: '',
    role: 1,
    password: ''
  });
  fetchFacultyData() {
    this.apiService.postLoginFacultyData(this.checkoutForm.value).subscribe(data => {
      this.data = data; // Assign the received data to jsonData
    }); // Log response for debugging
    if(this.data.role==1){
      this.router.navigate(['/hod-dashboard']);
  }
}
}