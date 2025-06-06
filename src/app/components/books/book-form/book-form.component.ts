import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../../services/books.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  private bookformSubscription?: Subscription;
  private paramsSubscription?: Subscription;

  private bookService = inject(BooksService);
  private fb = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  isEdit = false;
  id = 0;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publishYear: ['', Validators.required],
    });

    this.paramsSubscription = this.activatedRoute.params.subscribe({
      next: (params) => {
        this.id = +params['id']; // Ensure it's a number
        if (this.id) {
          this.isEdit = true;
          this.bookService.getBook(this.id).subscribe({
            next: (book) => {
              if (book) {
                this.form.patchValue(book);
                this.form.markAsPristine();
              } else {
                console.warn('Book not found');
              }
            },
            error: (err) => console.error(err),
          });
        }
      },
      error: (err) => console.error(err),
    });
  }

  hasChanges(): boolean {
    return !this.form.pristine;
  }

  onSubmit(): void {
    if (this.form.invalid || (this.isEdit && !this.hasChanges())) return;

    const bookData = this.form.value;

    const action$ = this.isEdit
      ? this.bookService.editBook(this.id, bookData)
      : this.bookService.addBook(bookData);

    this.bookformSubscription = action$.subscribe({
      next: () => this.router.navigateByUrl('/books'),
      error: (err) => console.error(err),
    });
  }

  ngOnDestroy(): void {
    this.bookformSubscription?.unsubscribe();
    this.paramsSubscription?.unsubscribe();
  }
}
