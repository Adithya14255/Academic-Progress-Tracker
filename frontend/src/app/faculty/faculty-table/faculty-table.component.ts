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
  boxcolor: string = 'white';
  editedIndex: number | null = null;
  hourschange: number = 0;
  completedList: number = 0;
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
    this.apiService.getFacultyCourseList({'uid':this.userdata.uid}).subscribe(
      response => {
        this.coursedata = response;
        console.log(this.coursedata);

      });}
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
    this.editedIndex=null;
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
    this.editedIndex = index;
    this.hourschange=0;
  }

  viewCompletedList() {
    this.apiService.getFacultyCompletedData(this.userdata.uid).subscribe(response => {
      // Check if response contains 'Failure' or data
      if (response.data == 'Failure') {
        this.completedData = 'Failure';
        console.log("here");
      } else {
        console.log("here instead");
        this.completedData = response;  // Assuming the valid data is in response.data
      }
      this.completedList = 1;  // Trigger the display logic
    });
  }
  
  
}
