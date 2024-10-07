import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { User } from '../../interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-faculty-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './faculty-table.component.html',
  styleUrls: ['./faculty-table.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ backgroundColor: '', opacity: 0 }),
        animate(1000, style({ backgroundColor: 'white', opacity: 1 }))
      ])
    ])
  ],
})

export class FacultyTableComponent {
  data: any[] = [];  // Make sure this is an array
  completedData: any;
  userdata: any;
  coursedata: any;
  displayCourseData: any = { course_code: '', course_name: '' };
  boxcolor: string = 'white';
  editedIndex: number | null = null;
  completedIndex: number | null = null;
  hourschange: number = 0;
  completedList: number = 0;
  link: any;
  name: string = '';
  displayTable: boolean = true;
  displayDetailsTable: boolean = true;
  completedTopicPrompt: boolean = false;
  details: boolean = false;
  activeButton: string = 'uploaded';
  displayforapproved: boolean = false;

  checkoutForm = this.formBuilder.group({
    handler_id: 0,
    topic_id: 0,
    hours_completed: 0
  });

  getCourseDataForm = this.formBuilder.group({
    course_code: '',
  });

  constructor(private location: Location, private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    const state = this.location.getState();
    if (typeof state === 'object' && state !== null) {
      this.userdata = state as User;
    }
    if (this.userdata) {
      this.name = this.userdata.name;
      this.apiService.getFacultyCourseList({ 'uid': this.userdata.uid }).subscribe(
        response => {
          this.coursedata = response;
          this.displayCourseData = this.coursedata[0];
          this.apiService.getFacultyData(this.userdata.uid, this.coursedata[0].course_code).subscribe(
            response => {
              this.data = response;
            });
        });
    }
  }

  navigateWithData(): void {
    this.router.navigateByUrl('/faculty-incharge', { state: this.userdata });
  }

  getCourseDetails() {
    console.log(this.getCourseDataForm.value);
    this.apiService.getFacultyData(this.userdata.uid, this.getCourseDataForm.value.course_code).subscribe(
      response => {
        this.data = response;  // Update 'data' with the fetched topics

        if ('response' in response) {
          alert("Error - no entries to show");
          console.log(response.response);
        }else{
        this.displayTable = this.data.length > 0; // Show the table only if there are topics
        this.displayCourseData = {'course_code':response[0].course_code,'course_name':response[0].course_name};
        console.log('fine');
        }
    });
  }

  getBoxColor(value: number): string {
    switch (value) {
      case 0: return 'white';
      case 1: return 'orange';
      case 2: return 'red';
      case 3: return 'green';
      default: return 'white'; // Default color
    }
  }

  hoursupdate(hourschange: number, topic_id: number, uid: number) {
    this.completedIndex = null;
    if (topic_id === 0) {
      return;
    }
    this.checkoutForm.patchValue({
      handler_id: uid,
      topic_id: topic_id,
      hours_completed: hourschange
    });
    this.apiService.updateHoursCompletedDetails(this.checkoutForm.value).subscribe();
    this.router.navigateByUrl('/faculty-table', { state: this.data }).then(() => {
      window.location.reload();
    });
  }

  editItem(index: number) {
    this.completedIndex = index;
    this.hourschange = 0;
  }

  viewCompletedList() {
    this.details = false;
    this.displayTable = false;
    this.completedTopicPrompt = true;
    this.displayforapproved = true;
    this.activeButton = 'approved';
    this.apiService.getFacultyCompletedData(this.userdata.uid).subscribe(response => {
      this.completedData = response.data === 'Failure' ? 'Failure' : response;  // Handle failure case
      this.completedList = 1;  // Trigger the display logic
    });
  }

  getCanLinkUpdateForm = this.formBuilder.group({
    handler_id: 0,
    topic_id: 0,
    link: '',
  });

  idupdate(index: number): void {
    this.editedIndex = index;
  }

  showDetails() {
    this.details = true;
    this.displayTable = false;
    this.displayDetailsTable = true;
    this.activeButton = 'details';
    this.completedTopicPrompt = false;
  }

  showUploaded() {
    this.details = false;
    this.displayTable = true;
    this.activeButton = 'uploaded';
    this.completedTopicPrompt = false;
    this.displayforapproved = false;
  }

  linkupdate(link: string, topic_id: number, uid: number): void {
    this.editedIndex = null;
    if (topic_id === 0) {
      return;
    }
    const moodleBaseUrl = 'https://moodle.kgkite.ac.in'; // Set this to your Moodle base URL
    if (link.startsWith(moodleBaseUrl)) {
      this.getCanLinkUpdateForm.patchValue({
        handler_id: uid,
        topic_id: topic_id,
        link: link,
      });
      this.apiService.updateLinkDetails(this.getCanLinkUpdateForm.value).subscribe();
      this.router
        .navigateByUrl('/faculty-table', { state: this.data })
        .then(() => {
          window.location.reload();
        });
     
    }
    alert("Invalid link entered");
    return; // Append the token
  }
}
