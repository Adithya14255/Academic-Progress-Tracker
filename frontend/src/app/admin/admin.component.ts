import { Component } from '@angular/core';
import { User } from '../interfaces/user';
import { CommonModule, Location } from '@angular/common';
import { ApiService } from '../api.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  data: User = {uid:0,name:'',role_id:0,department_id:0};
  courses: any= [];
  constructor(private location:Location,private apiService: ApiService,private formBuilder: FormBuilder){}
  checkoutForm = this.formBuilder.group({   department_id: 1  });
  ngOnInit(): void {
    const state = this.location.getState();
    if (typeof state === 'object' && state !== null) {
    this.data = state as User;
}
}
fetchCourses() {
  this.apiService.getCourseData(this.checkoutForm.value).subscribe(data => {
    this.courses = data; // Assign the received data to jsonData
    console.log(this.courses);
}
);

}
}
