import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  data: User = {id:0,name:'',role:0,department_id:0};
  constructor(private router: Router,private formBuilder: FormBuilder,private apiService: ApiService) {}
  checkoutForm = this.formBuilder.group({
    name: '',
    role: 4,
    password: ''
  });
  fetchAdminData() {
    this.apiService.postLoginAdminData(this.checkoutForm.value).subscribe(data => {
      this.data = data; // Assign the received data to jsonData 
      if(this.data.role==4){
        this.router.navigateByUrl('/admin', { state: this.data  });
    }}
  );
  
}
}
