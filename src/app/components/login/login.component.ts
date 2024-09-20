import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../http/http.service';
import { Router, RouterLink } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  builder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);

  loginForm = this.builder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  // Log in the user
  onLogin() {
    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;

    this.httpService
      .login(email, password)
      .pipe(
        catchError((error) => {
          return of(null);
        })
      )
      .subscribe((result) => {
        if (result && result.token) {
          localStorage.setItem('token', result.token);
          this.router.navigateByUrl('/books');
        }
      });
  }
}
