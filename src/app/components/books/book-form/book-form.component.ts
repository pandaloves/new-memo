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
import { ToastrService } from 'ngx-toastr';
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
  bookformSubscription!: Subscription;
  paramsSubscription!: Subscription;
  bookService = inject(BooksService);
  toasterService = inject(ToastrService);

  isEdit = false;
  id = 0;
  originalBookValues: any = {};

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publishYear: ['', Validators.required],
    });

    this.paramsSubscription = this.activatedRouter.params.subscribe({
      next: (params) => {
        this.id = params['id'];
        if (this.id) {
          this.isEdit = true;
          this.bookService.getBook(this.id).subscribe({
            next: (response) => {
              this.originalBookValues = { ...response }; // Store original values
              this.form.patchValue(response);
              // Mark form as pristine when data is loaded
              this.form.markAsPristine();
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // Check if form values have changed using ngDirty
  hasChanges(): boolean {
    return !this.form.pristine; // Form is not pristine means it has been modified
  }

  // Submit a book
  onSubmit() {
    // Check for invalid form
    if (this.form.invalid) {
      this.toasterService.error('Vänligen fyll i alla obligatoriska fält.');
      return;
    }

    // Check if in edit mode and no changes have been made
    if (this.isEdit && !this.hasChanges()) {
      this.toasterService.info('Ingen förändring att spara.');
      return;
    }

    // Submit the form based on whether it is a new book or an edit
    if (!this.isEdit) {
      this.bookformSubscription = this.bookService
        .addBook(this.form.value)
        .subscribe({
          next: () => {
            this.toasterService.success('Boken har lagts till!');
            this.router.navigateByUrl('/books');
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      this.bookformSubscription = this.bookService
        .editBook(this.id, this.form.value)
        .subscribe({
          next: () => {
            this.toasterService.success('Boken har redigerats!');
            this.router.navigateByUrl('/books');
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.bookformSubscription) {
      this.bookformSubscription.unsubscribe();
    }
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }
}
