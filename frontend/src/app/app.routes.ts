import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HodDashboardComponent } from './hod-dashboard/hod-dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DomainMentorPortalBaseComponent } from './domain-mentor/domain-mentor-portal-base/domain-mentor-portal-base.component';
import { CourseMentorPortalComponent } from './course-mentor/course-mentor-portal/course-mentor-portal.component';
import { FaculityLoginComponent } from './login/faculity-login/faculity-login.component';
import { DomainMentorLoginComponent } from './login/domain-mentor-login/domain-mentor-login.component';
import { CourseMentorLoginComponent } from './login/course-mentor-login/course-mentor-login.component';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';
import { FacultyTableComponent } from './faculty/faculty-table/faculty-table.component';
import { CourseMentorPortalTableComponent } from './course-mentor/course-mentor-portal-table/course-mentor-portal-table.component';

export const routes: Routes = [
    { path: '', component:LoginComponent,
    children: [
        { path: 'faculty', component: FaculityLoginComponent },
        { path: 'course-mentor', component: CourseMentorLoginComponent },
        { path: 'domain-mentor', component: DomainMentorLoginComponent },
        { path: 'admin', component: AdminLoginComponent}    
      ]},
    { path: 'faculty-incharge', component:FacultyTableComponent },
    { path: 'course-mentor-portal', component: CourseMentorPortalComponent},
    { path: 'course-mentor-portal-table', component: CourseMentorPortalTableComponent },
    { path: 'hod-dashboard', component: HodDashboardComponent},
    { path: 'header', component: HeaderComponent},
    { path: 'footer', component: FooterComponent},
    { path: 'domain-mentor-portal',component: DomainMentorPortalBaseComponent},
    
];
