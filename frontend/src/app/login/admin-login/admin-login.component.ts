import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  data: User = {id:0,name:'',role:0,password:'',department_id:0};
  constructor(private router: Router,private formBuilder: FormBuilder,private apiService: ApiService) {}
  checkoutForm = this.formBuilder.group({
    name: '',
    role: 4,
    password: ''
  });
  fetchAdminData() {
    this.apiService.postLoginAdminData(this.checkoutForm.value).subscribe(data => {
      this.data = data; // Assign the received data to jsonData
      this.data = data; 
      if(this.data.role==4){
        this.router.navigateByUrl('/hod-dashboard', { state: this.data  });
    }}
  );
  
}
}
