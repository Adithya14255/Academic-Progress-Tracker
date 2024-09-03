import { Component } from '@angular/core';
import { User } from '../interfaces/user';
import { CommonModule, Location } from '@angular/common';
import { ApiService } from '../api.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  data: User = { uid: 0, name: '', role_id: 0, department_id: 0 };
  courses: any = [];
  courseResponse: any = "failed";
  topicResponse: any = "failed";
  topics: any = [];
  constructor(
    private location: Location,
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {}
  checkoutForm = this.formBuilder.group({ department_id: 0 });
  ngOnInit(): void {
    const state = this.location.getState();
    if (typeof state === 'object' && state !== null) {
      this.data = state as User;
    }
  }
  fetchCourses() {
    this.apiService.getCourseData(this.checkoutForm.value).subscribe((data) => {
      this.courses = data; // Assign the received data to jsonData
      console.log(this.courses);
    });
  }
  addCourseForm = this.formBuilder.group({ department_id: 0,course_code:0,course_name:0 });

  addCourse() {
    this.apiService.addCourseData(this.addCourseForm.value).subscribe((data) => {
      this.courseResponse = data; // Assign the received data to jsonData
      console.log(this.courseResponse);
    });
  }
  addTopicForm = this.formBuilder.group({ topic:"",course_code:"",topic_id:0,outcome:"",total_hours:0 });

  addTopic() {
    this.apiService.addTopicData(this.addTopicForm.value).subscribe((data) => {
      this.topicResponse = data; // Assign the received data to jsonData
      console.log(this.topicResponse);
    });
  }

  getTopicForm = this.formBuilder.group({ course_code:0 });

  getTopic() {
    this.apiService.getTopicData(this.getTopicForm.value).subscribe((data) => {
      this.topics = data; // Assign the received data to jsonData
      console.log(this.topics);
    });
  }
}
