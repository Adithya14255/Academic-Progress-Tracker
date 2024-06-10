import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { User } from '../../interfaces/user';
import { Mentor } from '../../interfaces/mentor';
import { ApiService } from '../../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-mentor-portal-table',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule to imports
  templateUrl: './course-mentor-portal-table.component.html',
  styleUrls: ['./course-mentor-portal-table.component.css']
})
export class CourseMentorPortalTableComponent {
  data: Mentor[] = [{mentor_id:0,uid:0,course_code:'',course_name:'',status_code:3,url:'',topic:'',outcome:''}];
  userdata: User = {uid:0,name:'',role_id:0,department_id:0};
  boxcolor: string = 'white';
  constructor(private location:Location,private apiService: ApiService,private route: ActivatedRoute) {}
  ngOnInit(): void {
    const state = this.location.getState();
    if (typeof state === 'object' && state !== null) {
    this.userdata = state as User;
  }console.log(this.userdata)
    this.apiService.getFacultyData(this.userdata.uid).subscribe(
      response => {
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
}