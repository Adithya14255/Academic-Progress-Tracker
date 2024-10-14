import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-domain-mentor-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './domain-mentor-login.component.html',
  styleUrls: ['./domain-mentor-login.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ backgroundColor: 'transparent', opacity: 0 }),
        animate(1000, style({ backgroundColor: 'white', opacity: 1 }))
      ])
    ]),
    trigger('slideLeft', [
      transition(':enter', [
        style({ transform: 'translateX(20vw)' }),
        animate('500ms 400ms linear', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('500ms  linear', style({ transform: 'translateX(20vw)' }))
      ])
    ])
  ]// Note the plural 'styleUrls'
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
  ngOnInit(){
  }
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
