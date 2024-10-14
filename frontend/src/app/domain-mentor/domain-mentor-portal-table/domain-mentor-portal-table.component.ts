import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';
import { User } from '../../interfaces/user';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { DomainMentor } from '../../interfaces/domainmentor';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-domain-mentor-portal-table',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule,ReactiveFormsModule],
  templateUrl: './domain-mentor-portal-table.component.html',
  styleUrls: ['./domain-mentor-portal-table.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ backgroundColor: '', opacity: 0 }),
        animate(1000, style({ backgroundColor: 'white', opacity: 1 }))
      ])
    ])
  ],
})
export class DomainMentorPortalTableComponent {
  data: any;
  userdata: any;
  name: string = '';
  domain_id: number = 0;
  coursedata: any;
  displayCourseData: any = { course_code: '', course_name: '' };
  boxcolor: string = 'white';
  editedIndex: number | null = null;
  comment: string = '';
  checkoutForm = this.formBuilder.group({
    handler_id: 0,
    topic_id: 0,
    comment: ''
  });
  displayTable: boolean = true;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const state = this.location.getState();
    if (typeof state === 'object' && state !== null) {
      this.userdata = state;
      console.log(this.userdata);
    }
    if (this.userdata) {
      this.apiService.getDomainMentorCourse({ 'domain_id': this.userdata.domain_id }).subscribe(
        response => {
          this.coursedata = response;
          this.displayCourseData = this.coursedata[0];
          this.name = this.userdata.name;
          this.domain_id = this.userdata.domain_id;
          this.apiService.getDomainMentorData({'domain_id':this.userdata.domain_id,'course_code':this.displayCourseData.course_code}).subscribe(
          response => {
            this.data = response;
            this.displayTable = this.data.length > 0; // Show the table only if there are topics
            console.log(this.displayCourseData);
        }
      );
        });
      
    }
  }
  getCourseDataForm = this.formBuilder.group({
    course_code: '',
  });
  getCourseDetails() {
    this.apiService.getDomainMentorData({'domain_id':this.userdata.domain_id,'course_code':this.getCourseDataForm.value.course_code}).subscribe(
      response => {
        this.data = response;
        this.displayTable = this.data.length > 0; // Show the table only if there are topics
      },
      error => alert("Error - try again")
    );
  }

  approveupdate(topic_id: number, uid: number): void {
    this.editedIndex = null;
    this.checkoutForm.patchValue({
      handler_id: uid,
      topic_id: topic_id,
      comment: ''
    });
    this.apiService.updateCommentDetails(1, this.checkoutForm.value).subscribe();
    this.refreshTable();
  }

  disapproveupdate(index: number): void {
    this.editedIndex = index;
  }

  commentupdate(comment: string, topic_id: number, uid: number): void {
    this.editedIndex = null;
    if (topic_id === 0) {
      return;
    }
    this.checkoutForm.patchValue({
      handler_id: uid,
      topic_id: topic_id,
      comment: comment
    });
    this.apiService.updateCommentDetails(0, this.checkoutForm.value).subscribe();
    this.refreshTable();
  }

  cancelEdit(): void {
    this.editedIndex = null;
  }

  refreshTable(): void {
    this.router.navigateByUrl('/domain-mentor-table', { state: this.data }).then(() => {
      window.location.reload();
    });
  }

  getBoxColor(value: number): string {
    switch (value) {
      case 0:
        return 'white';
      case 1:
        return 'orange';
      case 2:
        return 'red';
      case 3:
        return 'green';
      case 4:
        return 'darkblue';
      default:
        return 'white';
    }
  }

  navigateWithData(): void {
    this.router.navigateByUrl('/domain-mentor', { state: this.userdata });
  }
}
