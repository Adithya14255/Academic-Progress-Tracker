import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-mentor-portal-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './course-mentor-portal-table.component.html',
  styleUrls: ['./course-mentor-portal-table.component.css'],
})
export class CourseMentorPortalTableComponent {
  data: any;
  displayCourseData: any = { course_code: '', course_name: '' };
  userdata: any;
  editedIndex: number | null = null;
  link: string = '';
  faculty: any = [];
  msg: string = '';
  name: string = '';
  displayTable: boolean = true;
  displayAddTopic: boolean = false; 

  addTopicForm = this.formBuilder.group({
    topic: '',
    course_code: '',
    outcome: '',
    total_hours: 0,
    uid: 0
  });

  checkoutForm = this.formBuilder.group({
    handler_id: [0],
    topic_id: [0],
    link: [''],
  });

  constructor(
    private location: Location,
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const state = this.location.getState();
    if (state && typeof state === 'object') {
      this.userdata = state;
      this.name = this.userdata.name;
    }
    if (this.userdata) {
      this.apiService.getCoordinatorCourse({ 'uid': this.userdata.uid })
        .subscribe((response) => {
          if ('response' in response) {
            this.msg = response.response;
            console.log(response.response);
          } else {
            this.displayCourseData = response[0];
            this.getCoordinatorData();
            this.apiService.getFacultyInCourse({ 'course_code': this.displayCourseData.course_code })
              .subscribe((data) => {
                this.faculty = data;
              });
          }
        });
    }
  }

  showTable() {
    this.displayTable = true;
    this.displayAddTopic = false;
  }

  showAddTopic() {
    this.displayAddTopic = true;
    this.displayTable = false;
  }

  navigateWithData(): void {
    this.router.navigateByUrl('/course-mentor', { state: this.userdata });
  }

  getCoordinatorData() {
    this.apiService.getCourseMentorData(this.userdata.uid).subscribe(response => {
      if ('response' in response) {
        this.msg = response.response;
        console.log(response.response);
        this.data = [];
      } else {
        this.data = response;
      }
    });
  }

  addTopic() {
    this.addTopicForm.patchValue({
      course_code: this.displayCourseData.course_code
    });
    this.apiService.addTopicData(this.addTopicForm.value).subscribe((data) => {
      console.log(data);
      this.msg = "Topic added successfully!";
      this.addTopicForm.reset();  // Reset form after submission
      this.displayAddTopic = false;  // Optionally hide the form
    });
  }

  getBoxColor(value: number): string {
    switch (value) {
      case 0: return 'white';
      case 1: return 'orange';
      case 2: return 'red';
      case 3: return 'green';
      case 4: return 'darkblue';
      default: return 'white';
    }
  }

  idupdate(index: number): void {
    this.editedIndex = index;
  }

  linkupdate(link: string, topic_id: number, uid: number): void {
    this.editedIndex = null;
    if (topic_id == 0) {
      return;
    }
    this.checkoutForm.patchValue({
      handler_id: uid,
      topic_id: topic_id,
      link: link,
    });
    this.apiService.updateLinkDetails(this.checkoutForm.value).subscribe(() => {
      this.router.navigateByUrl('/course-mentor-table', { state: this.data })
        .then(() => window.location.reload());
    });
  }
}