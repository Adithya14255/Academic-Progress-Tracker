import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-domain-mentor-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './domain-mentor-login.component.html',
  styleUrls: ['./domain-mentor-login.component.css'] // Note the plural 'styleUrls'
})
export class DomainMentorLoginComponent {
  data: User = {id:0,name:'',role:0,department_id:0};
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
        if(this.data.role==3){
          this.router.navigateByUrl('/domain-mentor', { state: this.data  });
      }}
    );
    }
  }
}
