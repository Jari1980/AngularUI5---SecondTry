import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserInterface } from '../user.interface';
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient)
  authService = inject(AuthService)
  router = inject(Router)

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void{
    
    //this.http.post<{user: UserInterface}>( 
     // 'https://booklistapplication.azurewebsites.net/api/JWTAPI/register', min API fungerar men får inte till databinding till interfacet
     this.http.post<{user: UserInterface}>('https://api.realworld.io/api/users', {
      user: this.form.getRawValue(),
     })
    .subscribe((response) => {
      console.log('response', response);
      localStorage.setItem('token', response.user.token);
      this.authService.currentUserSig.set(response.user);
      this.router.navigateByUrl('books');
    })
    console.log(this.form.getRawValue());
  }
}
