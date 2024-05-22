import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faculity-login',
  standalone: true,
  imports: [],
  templateUrl: './faculity-login.component.html',
  styleUrl: './faculity-login.component.css'
})
export class FaculityLoginComponent {
  constructor(private router: Router) {}

  onComponentSelect(event: Event) {
    const selectedComponent = (event.target as HTMLSelectElement).value;
    console.log(selectedComponent);
    this.router.navigate([`/${selectedComponent}`]);
  }
}
