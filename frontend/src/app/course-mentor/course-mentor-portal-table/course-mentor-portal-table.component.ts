import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, FormBuilder } from '@angular/forms'; // Import FormsModule for ngModel
import { User } from '../../interfaces/user';
import { CourseMentor } from '../../interfaces/coursementor';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-mentor-portal-table',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule to imports
  templateUrl: './course-mentor-portal-table.component.html',
  styleUrls: ['./course-mentor-portal-table.component.css'],
})
export class CourseMentorPortalTableComponent {
  data: CourseMentor[] = [
    {
      mentor_id: 0,
      uid: 0,
      course_code: '',
      course_name: '',
      status_code: 3,
      url: '',
      topic: '',
      topic_id: 0,
      outcome: '',
    },
  ];
  userdata: User = { uid: 0, name: '', role_id: 0, department_id: 0 };
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
    console.log(this.userdata);
    this.apiService
      .getCourseMentorData(this.userdata.uid)
      .subscribe((response) => {
        this.data = response;
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
