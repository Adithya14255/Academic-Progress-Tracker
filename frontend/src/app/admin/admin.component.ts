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
  response: any = "failed";
  mentorList:any=[];
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
  addCourseForm = this.formBuilder.group({ department_id: 1,course_code:0,course_name:0,domain_id:0 });

  addCourse() {
    this.apiService.addCourseData(this.addCourseForm.value).subscribe((data) => {
      this.response = data; // Assign the received data to jsonData
      console.log(this.response);
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
      this.response = data; // Assign the received data to jsonData
    });
  }
  assignCourseForm = this.formBuilder.group({ uid:0,course_code:"" });

  assignCourseDetails() {
    this.apiService.assignCourseUser(this.assignCourseForm.value).subscribe((data) => {
      this.response = data; // Assign the received data to jsonData
    });
    console.log(this.assignCourseForm)
  }

  onDepartmentFacultyOptionChange(event: Event) {

    const selectedValue: string = (event.target as HTMLSelectElement).value;
    this.apiService.getFacultyInDepartment({department_id:selectedValue}).subscribe((data) => {
      this.faculty = data; // Assign the received data to jsonData
    });
    console.log(selectedValue)
  }

  onDepartmentCoordinatorOptionChange(event: Event) {

    const selectedValue: string = (event.target as HTMLSelectElement).value;
    this.apiService.getCoordinatorsInDepartment({department_id:selectedValue}).subscribe((data) => {
      this.faculty = data; // Assign the received data to jsonData
    });
    console.log(selectedValue)
  }
  onDepartmentDomainMentorOptionChange(event: Event) {

    const selectedValue: string = (event.target as HTMLSelectElement).value;
    this.apiService.getDomainMentorsInDepartment({department_id:selectedValue}).subscribe((data) => {
      this.faculty = data; // Assign the received data to jsonData
    });
    console.log(selectedValue)
  }
  assignMentorForm = this.formBuilder.group({ uid:0,course_code:"" });

  assignCourseMentorDetails() {
    this.apiService.assignCourseMentor(this.assignMentorForm.value).subscribe((data) => {
      this.response = data;
    });
  }
  assignDomainMentorForm = this.formBuilder.group({ mentor_id:0,domain_id:0 });

  assignDomainMentorDetails() {
    this.apiService.assignDomainMentor(this.assignDomainMentorForm.value).subscribe((data) => {
      this.response = data;
    });
  }

  getMentorListForm = this.formBuilder.group({ department_id:0 });

  getMentorListDetails() {
    this.apiService.getMentorList(this.getMentorListForm.value).subscribe((data) => {
      this.mentorList = data;
      this.response = data;
    });
  }
}
