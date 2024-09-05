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
  data: any;
  courses: any = [];
  courseResponse: any = "failed";
  topicResponse: any = "failed";
  registerResponse: any = "failed";
  assignmentResponse: any = "failed";
  mentorAssignmentResponse: any = "failed";
  topics: any = [];
  faculty: any = [];
  constructor(
    private location: Location,
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {}
  checkoutForm = this.formBuilder.group({ department_id: 1 });
  ngOnInit(): void {
    const state = this.location.getState();
    if (typeof state === 'object' && state !== null) {
      this.data = state as User;
    }
  }
  fetchCourses() {
    this.apiService.getCourseData(this.checkoutForm.value).subscribe((data) => {
      this.courses = data; // Assign the received data to jsonData
    });
  }
  addCourseForm = this.formBuilder.group({ department_id: 1,course_code:0,course_name:0 });

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
  onCourseOptionChange(event: Event) {

    const selectedValue: string = (event.target as HTMLSelectElement).value;
    this.apiService.getCourseData({department_id:selectedValue}).subscribe((data) => {
      this.courses = data; // Assign the received data to jsonData
    });
    console.log(selectedValue)
  }

  userRegistrationForm = this.formBuilder.group({ id:0,name:"",password:"",role:0,department_id:0, });

  registerUserInfo() {
    this.apiService.registerUser(this.userRegistrationForm.value).subscribe((data) => {
      this.registerResponse = data; // Assign the received data to jsonData
    });
  }
  assignCourseForm = this.formBuilder.group({ uid:0,course_code:"" });

  assignCourseDetails() {
    this.apiService.assignCourseUser(this.assignCourseForm.value).subscribe((data) => {
      this.assignmentResponse = data; // Assign the received data to jsonData
    });
    console.log(this.assignCourseForm)
  }

  onAssignOptionChange(event: Event) {

    const selectedValue: string = (event.target as HTMLSelectElement).value;
    this.apiService.getFacultyInDepartment({department_id:selectedValue}).subscribe((data) => {
      this.faculty = data; // Assign the received data to jsonData
    });
    console.log(selectedValue)
  }
  assignMentorForm = this.formBuilder.group({ uid:0,course_code:"" });

  assignCourseMentorDetails() {
    this.apiService.assignCourseMentor(this.assignMentorForm.value).subscribe((data) => {
      this.mentorAssignmentResponse = data; // Assign the received data to jsonData
    });
  }
}
