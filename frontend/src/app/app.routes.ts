import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HodDashboardComponent } from './hod-dashboard/hod-dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DomainMentorPortalComponent } from './domain-mentor-portal/domain-mentor-portal.component';
import { FacultyInchargeComponent } from './faculty-incharge/faculty-incharge.component';
import { CourseMentorPortalComponent } from './course-mentor-portal/course-mentor-portal.component';

export const routes: Routes = [
    { path: '', component: DomainMentorPortalComponent},
    { path: 'Login', component: LoginComponent },
    { path: 'faculty-incharge', component: FacultyInchargeComponent},
    { path: 'course-mentor-portal', component: CourseMentorPortalComponent},
    { path: 'hod-dashboard', component: HodDashboardComponent},
    { path: 'header', component: HeaderComponent},
    { path: 'footer', component: FooterComponent}
];
