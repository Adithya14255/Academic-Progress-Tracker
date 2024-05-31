import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomainMentorPortalBaseComponent } from './domain-mentor-portal-base/domain-mentor-portal-base.component';

@Component({
  selector: 'app-domain-mentor',
  standalone: true,
  imports: [RouterLink,DomainMentorPortalBaseComponent],
  templateUrl: './domain-mentor.component.html',
  styleUrl: './domain-mentor.component.css'
})
export class DomainMentorComponent {

}
