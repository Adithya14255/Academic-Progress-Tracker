import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { FormGroup,Validators,FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';


@Component({
  selector: 'app-course-mentor-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './course-mentor-login.component.html',
  styleUrl: './course-mentor-login.component.css'
})
export class CourseMentorLoginComponent {
  data: User = { id: 0, name: '', role: 0, password: '', department_id: 0 };
  checkoutForm = this.formBuilder.group({
    name: '',
    role: 2,
    password: ''
  });
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}
   
  fetchCourseMentorData() {
    this.apiService.postLoginCourseMentorData(this.checkoutForm.value).subscribe(data => {
      this.data = data; 
      if(this.data.role==2){
        this.router.navigateByUrl('/hod-dashboard', { state: this.data  });
    }}
  );
  }

}
