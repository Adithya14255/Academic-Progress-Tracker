import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { trigger, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger( 'fadeUp',[
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
      ])
    ])
  ]
})
export class LoginComponent {
  constructor(private router: Router) {
    this.router.navigateByUrl('/faculty-login');
  }
}
