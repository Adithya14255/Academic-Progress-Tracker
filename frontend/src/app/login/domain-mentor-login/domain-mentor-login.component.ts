import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-domain-mentor-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './domain-mentor-login.component.html',
  styleUrls: ['./domain-mentor-login.component.css'] // Note the plural 'styleUrls'
})
export class DomainMentorLoginComponent {
  data:any;
  errorMessage:string= '';
  constructor(private router: Router,private formBuilder: FormBuilder,private apiService: ApiService) {}
  checkoutForm = this.formBuilder.group({
    name: '',
    role: 3,
    password: ''
  });
  fetchDomainMentorData() {
    if (this.checkoutForm.valid) {
      this.apiService.postLoginDomainMentorData(this.checkoutForm.value).subscribe(data => {
        this.data = data;
        if('Error' in data){
          this.errorMessage=data.Error;
        }
        console.log(data);
        if(this.data.role_id==3){
          this.router.navigateByUrl('/domain-mentor', { state: this.data  });
      }}
    );
    }
  }
}
