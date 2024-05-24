import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-domain-mentor-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './domain-mentor-login.component.html',
  styleUrl: './domain-mentor-login.component.css'
})
export class DomainMentorLoginComponent {
  data: User = {id:0,name:'',role:0,password:'',department_id:0};
  constructor(private router: Router,private formBuilder: FormBuilder,private apiService: ApiService) {}
  checkoutForm = this.formBuilder.group({
    name: '',
    role: 3,
    password: ''
  });
  fetchDomainMentorData() {
    this.apiService.postLoginDomainMentorData(this.checkoutForm.value).subscribe(data => {
      this.data = data; // Assign the received data to jsonData
    }); // Log response for debugging
    if(this.data.role==3){
      this.router.navigate(['/hod-dashboard']);
  }
}
}
