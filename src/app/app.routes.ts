import { Routes } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { BookFormComponent } from './components/books/book-form/book-form.component';
import { QuotesComponent } from './components/quotes/quotes.component';
import { QuoteFormComponent } from './components/quotes/quote-form/quote-form.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'books',
    component: BooksComponent,
  },
  {
    path: 'book/form',
    component: BookFormComponent,
  },
  {
    path: 'books/:id',
    component: BookFormComponent,
  },
  {
    path: 'quotes',
    component: QuotesComponent,
  },
  {
    path: 'quote/form',
    component: QuoteFormComponent,
  },
  {
    path: 'quotes/:id',
    component: QuoteFormComponent,
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
