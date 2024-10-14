import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormGroup,Validators,FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-course-mentor-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './course-mentor-login.component.html',
  styleUrl: './course-mentor-login.component.css',
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
  ]
})
export class CourseMentorLoginComponent {
  data: User = {uid:0,name:'',role_id:0,department_id:0};
  errorMessage:string = '';

  constructor(private router: Router,private formBuilder: FormBuilder,private apiService: ApiService) {}
  checkoutForm = this.formBuilder.group({
    name: '',
    role: 2,
    password: ''
  });
  fetchCourseMentorData() {
    this.apiService.postLoginCourseMentorData(this.checkoutForm.value).subscribe(data => {
      this.data = data;
      if('Error' in data){
        this.errorMessage=data.Error;
      } 
      if(this.data.role_id==2){
        this.router.navigateByUrl('/course-mentor', { state: this.data  });
    }}
  );
  }

}
