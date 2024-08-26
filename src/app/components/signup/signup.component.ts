import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '../../http/http.service';
import { IUser } from '../../interfaces/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { StrongPasswordRegx } from '../../utils/StrongPasswordRegx';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  toaster = inject(ToastrService);

  signupForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(StrongPasswordRegx)],
    ],
  });

  get passwordFormField() {
    return this.signupForm.get('password');
  }

  showPassword: boolean = false;
  save() {
    const user: IUser = {
      username: this.signupForm.value.username!,
      email: this.signupForm.value.email!,
      password: this.signupForm.value.password!,
    };

    this.httpService
      .createUser(user)
      .pipe(
        catchError((error) => {
          console.error('Signup error', error);

          if (
            error.status === 400 &&
            error.error.error === 'Email has already existed!'
          ) {
            this.toaster.error(
              'E-postadressen finns redan. Försök med en annan.'
            );
          } else {
            this.toaster.error('Registreringen misslyckades. Försök igen.');
          }

          return of(null);
        })
      )
      .subscribe((result) => {
        if (result) {
          this.toaster.success('Registreringen lyckades.');
          this.router.navigateByUrl('/login');
        }
      });
  }
}
