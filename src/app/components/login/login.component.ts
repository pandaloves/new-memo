import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
  router = inject(Router);

  loginForm = this.builder.group({
    email: [''],
    password: [''],
  });

  // Log in the user
 onLogin() {
  const email = this.loginForm.value.email;
  localStorage.setItem('email', email ?? '');
  this.router.navigateByUrl('/books');
}
}
