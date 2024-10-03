import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder,ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { User } from '../../interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, style, transition, animate } from '@angular/animations'; // Updated import
import { error } from 'node:console';


@Component({
  selector: 'app-faculty-table',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
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
  data: any;
  completedData: any;
  userdata: any;
  coursedata: any;
  displayCourseData:any = {course_code:'',course_name:''};
  boxcolor: string = 'white';
  editedIndex: number | null = null;
  completedIndex: number | null = null;
  hourschange: number = 0;
  completedList: number = 0;
  link: any;
  name: string = '';
  checkoutForm = this.formBuilder.group({
    handler_id:0,
    topic_id:0,
    hours_completed:0
  });
  getCourseDataForm = this.formBuilder.group({
    course_code: '',
  });
  constructor(private location:Location,private formBuilder: FormBuilder,private apiService: ApiService,private router:Router) {}
  ngOnInit(): void {
    const state = this.location.getState();
    if (typeof state === 'object' && state !== null) {
    this.userdata = state as User;
  }
  if (this.userdata){
    this.name = this.userdata.name;
    this.apiService.getFacultyCourseList({'uid':this.userdata.uid}).subscribe(
      response => {
        this.coursedata = response;
        this.displayCourseData=this.coursedata[0];
        console.log(this.displayCourseData);
        this.apiService.getFacultyData(this.userdata.uid,this.coursedata[0].course_code).subscribe(
          response => {
            this.data = response;
          });
      });
    }
    }
    navigateWithData(): void {
      this.router.navigateByUrl('/faculty-incharge', { state: this.userdata });
    }
  getCourseDetails(){
        console.log(this.getCourseDataForm.value);
        this.apiService.getFacultyData(this.userdata.uid,this.getCourseDataForm.value.course_code).subscribe(
          response => {
            this.data = response;
          },error => alert("Error-try again"));}   
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
      default:
        return 'white'; // Default color
    }
  }

  hoursupdate(hourschange:number,topic_id:number,uid:number){
    this.completedIndex=null;
    if (topic_id==0){
      return;
    }
    this.checkoutForm.patchValue({
      handler_id:uid,
      topic_id: topic_id,
      hours_completed: hourschange
    });
    this.apiService.updateHoursCompletedDetails(this.checkoutForm.value).subscribe();
    console.log(this.checkoutForm.value);
    this.router.navigateByUrl('/faculty-table', { state: this.data }).then(() => {
      window.location.reload();
    });
    console.log(this.checkoutForm.value);
}

  editItem(index: number) {
    this.completedIndex = index;
    this.hourschange=0;
  }

  viewCompletedList() {
    this.apiService.getFacultyCompletedData(this.userdata.uid).subscribe(response => {
      // Check if response contains 'Failure' or data
      if (response.data == 'Failure') {
        this.completedData = 'Failure';
      } else {
        this.completedData = response;  // Assuming the valid data is in response.data
      }
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
  linkupdate(link:string,topic_id: number, uid: number): void {
    this.editedIndex = null;
    if (topic_id == 0) {
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
