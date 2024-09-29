import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, FormBuilder } from '@angular/forms'; // Import FormsModule for ngModel
import { User } from '../../interfaces/user';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainMentor } from '../../interfaces/domainmentor';

@Component({
  selector: 'app-course-mentor-portal-table',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule to imports
  templateUrl: './course-mentor-portal-table.component.html',
  styleUrls: ['./course-mentor-portal-table.component.css'],
})
export class CourseMentorPortalTableComponent {
  data: any;
  displayCourseData:any = {course_code:'',course_name:''};
  userdata: any;
  boxcolor: string = 'white';
  editedIndex: number | null = null;
  link: string = '';
  checkoutForm = this.formBuilder.group({
    handler_id: 0,
    topic_id: 0,
    link: '',
  });

  constructor(
    private location: Location,
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    const state = this.location.getState();
    if (typeof state === 'object' && state !== null) {
      this.userdata = state as User;
    }
    if(this.userdata){
    this.apiService
      .getCourseMentorData(this.userdata.uid)
      .subscribe((response) => {
        this.data = response;
        this.displayCourseData=this.data[0];
      });}
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
        return 'white'; // Default color
    }
  }

  idupdate(index: number): void {
    this.editedIndex = index;
  }

  linkupdate(link:string,topic_id: number, uid: number): void {
    this.editedIndex = null;
    if (topic_id == 0) {
      return;
    }
    this.checkoutForm.patchValue({
      handler_id: uid,
      topic_id: topic_id,
      link: link,
    });
    this.apiService.updateLinkDetails(this.checkoutForm.value).subscribe();
    this.router
      .navigateByUrl('/course-mentor-table', { state: this.data })
      .then(() => {
        window.location.reload();
      });
  }
}
