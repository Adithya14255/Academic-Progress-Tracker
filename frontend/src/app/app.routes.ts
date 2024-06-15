import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FaculityLoginComponent } from './login/faculity-login/faculity-login.component';
import { DomainMentorLoginComponent } from './login/domain-mentor-login/domain-mentor-login.component';
import { CourseMentorLoginComponent } from './login/course-mentor-login/course-mentor-login.component';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';
import { FacultyTableComponent } from './faculty/faculty-table/faculty-table.component';
import { CourseMentorPortalTableComponent } from './course-mentor/course-mentor-portal-table/course-mentor-portal-table.component';
import { FacultyComponent } from './faculty/faculty.component';
import { CourseMentorComponent } from './course-mentor/course-mentor.component';
import { DomainMentorPortalTableComponent } from './domain-mentor/domain-mentor-portal-table/domain-mentor-portal-table.component';
import { DomainMentorComponent } from './domain-mentor/domain-mentor.component';
import { AdminComponent } from './admin/admin.component';
import { DomainMentorPortalBaseComponent } from './domain-mentor/domain-mentor-portal-base/domain-mentor-portal-base.component';
import { ChartsComponent } from './charts/charts.component';



export const routes: Routes = [
    { path: '', component:LoginComponent,
    children: [
        { path: 'faculty-login', component: FaculityLoginComponent },
        { path: 'course-mentor-login', component: CourseMentorLoginComponent },
        { path: 'domain-mentor-login', component: DomainMentorLoginComponent },
        { path: 'admin-login', component: AdminLoginComponent}    
      ]},
    { path: 'faculty-incharge', component:FacultyComponent },
    { path: 'faculty-table', component:FacultyTableComponent },
    { path: 'course-mentor', component: CourseMentorComponent},
    { path: 'course-mentor-table', component: CourseMentorPortalTableComponent },
    { path: 'header', component: HeaderComponent},
    { path: 'footer', component: FooterComponent},
    { path: 'domain-mentor',component: DomainMentorComponent},
    { path: 'domain-mentor-table',component: DomainMentorPortalTableComponent}, 
    { path: 'admin',component: AdminComponent},
    { path: 'domain-mentor-base', component: DomainMentorPortalBaseComponent},    
    { path: 'chart', component: ChartsComponent},    

  ];