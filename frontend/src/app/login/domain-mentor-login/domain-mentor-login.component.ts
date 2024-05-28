import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-domain-mentor-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './domain-mentor-login.component.html',
  styleUrls: ['./domain-mentor-login.component.css'] // Note the plural 'styleUrls'
})
export class DomainMentorLoginComponent {
  data: User = { id: 0, name: '', role: 0, password: '', department_id: 0 };
  checkoutForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      role: [3, Validators.required],
      password: ['', Validators.required]
    });
  }

  fetchDomainMentorData() {
    if (this.checkoutForm.valid) {
      this.apiService.postLoginDomainMentorData(this.checkoutForm.value).subscribe(data => {
        this.data = data;
        if(this.data.role==3){
          this.router.navigateByUrl('/hod-dashboard', { state: this.data  });
      }}
    );
    }
  }
}
