import { Routes } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { BookFormComponent } from './components/books/book-form/book-form.component';
import { QuotesComponent } from './components/quotes/quotes.component';
import { QuoteFormComponent } from './components/quotes/quote-form/quote-form.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'books',
    component: BooksComponent,
    canActivate: [authGuard],
  },
  {
    path: 'book/form',
    component: BookFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'books/:id',
    component: BookFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'quotes',
    component: QuotesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'quote/form',
    component: QuoteFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'quotes/:id',
    component: QuoteFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
];
