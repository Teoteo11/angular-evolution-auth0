import { AsyncPipe, DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

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
   /*  this.authService.getAccessTokenSilently().pipe(
      catchError( err => of(
        console.log('🔴 ERR_ ',err.error),
        err.error === 'missing_refresh_token' && this.login()
      )),
    ).subscribe( v => console.log('prova: ',v)); */
    this.authService.isAuthenticated$.pipe( catchError((err) => of(console.log('🟡 AUTH ERROR: ',err)) ))
    .subscribe(
      v => console.log('🟡 SEI LOGGATO? ', v))
    // TODO: c'è da smarcare il problema del MISSING REFRESH TOKEN
    this.authService.error$.subscribe( 
      error =>{
        console.log('🔴 ERRORE LOGIN: ', error);
        if (error && error.message.includes('paradigma')) {
          console.log('TROVATO ERRORE ORA TI SLOGGO');
          alert('Devi loggarti con un account Paradigma!')
          this.authService.logout();
        }
      }
    );
  }

  login = () => {
    this.authService.loginWithRedirect().pipe(
      catchError((err) => of(console.log('err_ ', err))))
      .subscribe( i => console.log('I: ',i));
  }
}
