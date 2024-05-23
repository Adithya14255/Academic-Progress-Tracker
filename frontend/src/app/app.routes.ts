import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HodDashboardComponent } from './hod-dashboard/hod-dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DomainMentorPortalBaseComponent } from './domain-mentor-portal-base/domain-mentor-portal-base.component';
import { FacultyInchargeComponent } from './faculty-incharge/faculty-incharge.component';
import { CourseMentorPortalTableComponent } from './course-mentor-portal-table/course-mentor-portal-table.component';
import { AppComponent } from './app.component';
import { FaculityLoginComponent } from './faculity-login/faculity-login.component';
import { DomainMentorLoginComponent } from './domain-mentor-login/domain-mentor-login.component';
import { CourseMentorLoginComponent } from './course-mentor-login/course-mentor-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

export const routes: Routes = [
    { path: '', component: AppComponent},
    { path: 'login', component: LoginComponent },
    { path: 'faculty-incharge', component: FacultyInchargeComponent},
    { path: 'course-mentor-portal', component: CourseMentorPortalTableComponent},
    { path: 'hod-dashboard', component: HodDashboardComponent},
    { path: 'header', component: HeaderComponent},
    { path: 'footer', component: FooterComponent},
    { path: 'domain-mentor-portal',component: DomainMentorPortalBaseComponent},
    { path: 'faculty-login',component: FaculityLoginComponent},
    { path: 'domain-mentor-login',component: DomainMentorLoginComponent},
    { path: 'course-mentor-login', component: CourseMentorLoginComponent},
    { path: 'admin-login', component: AdminLoginComponent}
];
