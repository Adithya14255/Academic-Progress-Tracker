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

  getCourseDataForm = this.formBuilder.group({
    course_code: '',
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
    this.apiService.getFacultyData(this.userdata.uid, this.getCourseDataForm.value.course_code).subscribe(
      response => {
        this.data = response;
        this.displayTable = this.data.length > 0; // Show the table only if there are topics
      },
      error => alert("Error - try again")
    );
  }

  getBoxColor(value: number): string {
    switch (value) {
      case 0: return 'white';
      case 1: return 'orange';
      case 2: return 'red';
      case 3: return 'green';
      default: return 'white';  // Default color
    }
  }

  idupdate(index: number): void {
    this.editedIndex = index; // Set the edited index to the current item index
    this.link = this.data[index].url; // Pre-fill the link input with the current URL
  }

  linkupdate(link: string, topic_id: number, uid: number): void {
    if (link.trim() === '') {
      alert('Please enter a valid link.'); // Alert if the link is empty
      return;
    }

    this.apiService.updateLinkDetails({ link, topicId: topic_id, uid }).subscribe(
      (response: any) => { // Explicitly define the type
        // Handle response after updating the link
        if (response.success) {
          this.data[this.editedIndex!].url = link; // Use non-null assertion operator
          this.data[this.editedIndex!].status_code = 1; // Use non-null assertion operator
          this.editedIndex = null; // Reset the edited index
          this.link = ''; // Clear the input field
        } else {
          alert('Failed to update link. Please try again.');
        }
      },
      (error: any) => { // Explicitly define the type
        alert('An error occurred. Please try again.');
      }
    );
  }

  showDetails(): void {
    this.details = true;
    this.displayTable = true;
    this.activeButton = 'details';
    this.completedTopicPrompt = false;
  }

  showUploaded(): void {
    this.details = true;
    this.displayTable = true;
    this.activeButton = 'uploaded';
    this.completedTopicPrompt = false;
  }

  viewCompletedList(): void {
    this.details = true;
    this.displayTable = true;
    this.completedTopicPrompt = true;
    this.activeButton = 'approved';
    this.apiService.getFacultyCompletedData(this.userdata.uid).subscribe(response => {
      this.completedData = response.data === 'Failure' ? 'Failure' : response;
      this.completedList = 1;
    });
  }
}
