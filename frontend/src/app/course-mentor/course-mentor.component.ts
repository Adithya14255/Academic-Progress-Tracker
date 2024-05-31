import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseMentorPortalComponent } from './course-mentor-portal/course-mentor-portal.component';

@Component({
  selector: 'app-course-mentor',
  standalone: true,
  imports: [RouterLink,CourseMentorPortalComponent],
  templateUrl: './course-mentor.component.html',
  styleUrl: './course-mentor.component.css'
})
export class CourseMentorComponent {

}
