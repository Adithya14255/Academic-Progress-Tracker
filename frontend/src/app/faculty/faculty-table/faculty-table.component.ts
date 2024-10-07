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
  data: any[] = []; // Array to store table data
  completedData: any;
  userdata: any;
  coursedata: any;
  displayCourseData: any = { course_code: '', course_name: '' };
  editedIndex: number | null = null;
  link: string = '';
  name: string = '';
  displayTable: boolean = true;
  activeButton: string = 'details';  // Default to uploaded view
  details: boolean = true;  // Show details form
  displayforapproved: boolean = false;
  completedList: number = 0;
  completedTopicPrompt: boolean = false;
  submitted: boolean = false;

  checkoutForm = this.formBuilder.group({
    handler_id: 0,
    topic_id: 0,
    hours_completed: 0
  });

  getCourseDataForm = this.formBuilder.group({
    course_code: '',
  });

  getCanLinkUpdateForm = this.formBuilder.group({
    handler_id: 0,
    topic_id: 0,
    link: '',
  });

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const state = this.location.getState();
    if (typeof state === 'object' && state !== null) {
      this.userdata = state as User;
    }

    if (this.userdata) {
      this.name = this.userdata.name;
      this.apiService.getFacultyCourseList({ uid: this.userdata.uid }).subscribe(
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

  // Navigate back to the faculty-incharge page with user data
  navigateWithData(): void {
    this.router.navigateByUrl('/faculty-incharge', { state: this.userdata });
  }

  // Get course details when a course is selected
  getCourseDetails() {
    this.apiService.getFacultyData(this.userdata.uid, this.getCourseDataForm.value.course_code).subscribe(
      response => {
        this.data = response;
        this.displayTable = this.data.length > 0; // Show the table only if there are topics
        this.submitted = true;
      },
      error => alert("Error - try again")
    );
  }

  // Get the color based on status code
  getBoxColor(value: number): string {
    switch (value) {
      case 0: return 'white';
      case 1: return 'orange';
      case 2: return 'red';
      case 3: return 'green';
      default: return 'white';  // Default color
    }
  }

  // Handle editing index
  idupdate(index: number): void {
    this.editedIndex = index;
  }

  // Handle updating the link for an item
  linkupdate(link: string, topic_id: number, uid: number): void {
    this.editedIndex = null;
    if (topic_id === 0) {
      return;
    }
    const moodleBaseUrl = 'https://moodle.kgkite.ac.in';  // Set this to your Moodle base URL
    if (link.startsWith(moodleBaseUrl)) {
      this.getCanLinkUpdateForm.patchValue({
        handler_id: uid,
        topic_id: topic_id,
        link: link,
      });
      this.apiService.updateLinkDetails(this.getCanLinkUpdateForm.value).subscribe();
      this.router.navigateByUrl('/faculty-table', { state: this.data }).then(() => {
        window.location.reload();
      });
    } else {
      alert("Invalid link entered");
    }
  }

  // Show the "Details" form
  showDetails(): void {
    this.details = true;
    this.displayTable = false; // Hide the table initially when showing details
    this.activeButton = 'details';
    this.completedTopicPrompt = false;
  }

  // Show the "Uploaded" table
  showUploaded(): void {
    this.details = false;
    this.displayTable = true;
    this.activeButton = 'uploaded';
    this.completedTopicPrompt = false;
  }

  // View the list of approved/completed topics
  viewCompletedList(): void {
    this.details = false;
    this.displayTable = true;
    this.completedTopicPrompt = true;
    this.activeButton = 'approved';
    this.apiService.getFacultyCompletedData(this.userdata.uid).subscribe(response => {
      this.completedData = response.data === 'Failure' ? 'Failure' : response;
      this.completedList = 1;
    });
  }
}
