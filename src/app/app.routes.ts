import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CourseMentorPortralComponent } from './course-mentor-portral/course-mentor-portral.component';
import { CourseCoordinatorPortralComponent } from './course-coordinator-portral/course-coordinator-portral.component';
import { DomainMentorPortraltComponent } from './domain-mentor-portralt/domain-mentor-portralt.component';
import { HodDashboardComponent } from './hod-dashboard/hod-dashboard.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'course-mentor', component: CourseMentorPortralComponent},
    { path: 'course-coordinator', component: CourseCoordinatorPortralComponent},
    { path: 'domain-mentor', component: DomainMentorPortraltComponent},
    { path: 'hod-dashboard', component: HodDashboardComponent},
];
