import { Component, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from './user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  authService = inject(AuthService)
  title = 'AngularUI5';
  http = inject(HttpClient)

  ngOnInit(): void{
    this.http.get<{user: UserInterface}>('https://api.realworld.io/api/user')
    .subscribe({
      next: (response) =>{
        console.log('response', response);
        this.authService.currentUserSig.set(response.user);
      },
      error: () => {
        this.authService.currentUserSig.set(null);
      }
    });
  }

  logout(): void{
    console.log('logout');
    localStorage.setItem('token', '');
    this.authService.currentUserSig.set(null);
  }
}
