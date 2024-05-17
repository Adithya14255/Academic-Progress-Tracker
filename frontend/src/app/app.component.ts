import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable,of } from 'rxjs';
import { tap } from 'rxjs';
import { DomainMentorPortalComponent } from './domain-mentor-portal/domain-mentor-portal.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,CommonModule,DomainMentorPortalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ApiService]
})
export class AppComponent {
  title = 'dashboard';
  data$: Observable<any> = of(null);

 
  constructor(private apiService: ApiService) {}

  fetchData() {
    this.data$ = this.apiService.getData();
  }
}

