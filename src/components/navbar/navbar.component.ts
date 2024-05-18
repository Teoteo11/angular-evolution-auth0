import { AsyncPipe, DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  authService = inject(AuthService)
  document = inject(DOCUMENT);
  authSignal = toSignal(this.authService.isAuthenticated$)

  constructor() {
    this.authService.isAuthenticated$.subscribe( v => console.log('🟡 SEI LOGGATO? ',v))
  }
}
