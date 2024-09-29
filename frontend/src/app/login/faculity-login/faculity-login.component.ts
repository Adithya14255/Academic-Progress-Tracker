import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../api.service';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faculity-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './faculity-login.component.html',
  styleUrl: './faculity-login.component.css'
})
export class FaculityLoginComponent {
  data: User = {uid:0,name:'',role_id:0,department_id:0};
  errorMessage:string = '';
  constructor(private router: Router,private formBuilder: FormBuilder,private apiService: ApiService) {}
  checkoutForm = this.formBuilder.group({
    name: '',
    role: 1,
    password: ''
  });
  ngOnInit(): void {
    // this.apiService.loginMoodle()
    //   .subscribe(response => {
    //     if (response.token) {
    //       // Handle successful login and store the token
    //       localStorage.setItem('moodleToken', response.token);
    //       console.log('Login successful, token stored:', response.token);
    //     } else {
    //       // Handle login failure (invalid credentials or other issues)
    //       console.error('Login failed:', response);
    //     }
    //   });
  }


  fetchFacultyData() {
    this.apiService.postLoginFacultyData(this.checkoutForm.value).subscribe(data => {
      this.data = data; 
      console.log(data)
      if('Error' in data){
        this.errorMessage=data.Error;
      }
      if(this.data.role_id==1){
        this.router.navigateByUrl('/faculty-incharge', { state: this.data  });
    }}
  );
  
}
}
